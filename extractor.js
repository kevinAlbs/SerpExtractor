var $ = require('jquery');
var fs = require('fs');
var http = require('http');
var https = require('https');
var nurl = require('url');

function help(msg){
	if(msg) console.log(msg);
	console.log("Usage: node extractor.js <input file>");
	console.log("<input file> csv file, must use utf-8 encoding");
}

function readFile(){
	if(process.argv.length == 3){
		if(process.argv[2] == "-h" || process.argv[2] == "--help"){
			return help();
		}
		var filename = process.argv[2];		
		fs.readFile(filename, 'utf8', function(err, data){
			if(err) return help("ERROR: could not read file: " + filename);
			console.log("Input file read");
			extract(data);
		});
	}else{
		return help("ERROR: incorrect arguments");
	}
}

function extract(inputData){
      console.log("Extracting links");
      var csvOut = "";//output
      var urlsToFetch = [];
      var curUrl = 0;
      function fetchPage(page){
        //fetch that URL
        parsed = nurl.parse(page.url);
        requestProtocol = http;
        if(parsed.protocol == "https:"){
        	requestProtocol = https;
	    }
	    
    	requestProtocol.get(page.url, function(res){
        	//load into dom
        	pageData = "";
        	res.setEncoding("utf8");
        	res.on("data", function(chunk){
        		pageData += chunk;
        	});
        	res.on("end", function(){
        		console.log("Page fetched");
        		var domData = $(pageData);
				var links = domData.find("h3.r a");
				var printableURL = page.url;
				if(printableURL.length > 73) printableURL = page.url.substring(0, 70) + "...";
				console.log("Fetching " + printableURL + " page id: " + page.id);
				$.each(links, function(index, link){
					var uncleanURL = link.getAttribute("href");
					if(uncleanURL.substring(0, 4) != "/url"){
						//ignore links which don't start with /url
						return;
					}
					var cleanedURL = uncleanURL.split("?q=")[1];
					if(cleanedURL == undefined){
						console.log("Failed for: " + uncleanURL + " page id: " + page.id);
						return;
					}
					cleanedURL = cleanedURL.split("&")[0];
					if(cleanedURL == undefined){
						console.log("Failed for: " + uncleanURL + " page id: " + page.id);
						return;
					}
					csvOut += page.id + "," + index + "," + cleanedURL + "\n";
				});
				curUrl += 1;
				if(curUrl < urlsToFetch.length){
					//fetch the next page
					fetchPage(urlsToFetch[curUrl]);
				}
				else{
					//finished, write CSV
					var outname = "output";
					var extra = "";
					var id = 2;
					//check if it exists
					while(fs.existsSync(outname + extra + ".csv")){
						extra = "_" + id;
						id++;
					}
					var outpath = outname + extra + ".csv";
					console.log("Writing output to " + outpath);
					fs.writeFile(outpath, csvOut, function(err){
						if(err) console.log("Error saving csv to file...");
						else console.log("Finished, output saved in " + outpath);
					});
				}
				domData = null;
        	});

        }).on("error", function(e){
        	//ignore
        	console.log("Error fetching page: " + page.url);
        });
      }
      
      //load csv
	  var csvData = inputData;
      if(csvData == ""){
        return;
      }
      var lines = csvData.split("\n");
      for(var i =0; i < lines.length; i++){
        lines[i] = lines[i].trim();
        if(lines[i] == ""){
          continue;
        }
        
        var parts = lines[i].split(",");
        var id = parts[0];
        var url = parts[1];
        //clean url...

        //check if quotes surrounding
        if(url.charAt(0) == '"'){
          url = url.substring(1, url.length - 1);
        }
        urlsToFetch.push({'url': url, 'id': id});  
      }
      fetchPage(urlsToFetch[0]);

}
readFile();
