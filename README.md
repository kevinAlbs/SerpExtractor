##Dependencies:
NodeJS: http://nodejs.org/

I tested it using Node version 0.8.16.

I included the jquery npm module.

##Usage
node extractor.js <input file>

The input file must be a CSV formatted like so:

```
<page id>,<page url>\n
```

The page url may or may not have double quotes.

For example:
```
5046,"https://www.google.com/search?hl=en&noj=1&complete=0&site=webhp&tbs=cdr%3A1%2Ccd_min%3A1%2F1%2F1990%2Ccd_max%3A4%2F26%2F2013&source=hp&q=Where+do+people+cash+fish+standing+on+stilts&oq=Where+do+people+cash+fish+standing+on+stilts&gs_l=hp.3...6153.11392.0.11488.0.0.0.0.0.0.0.0..0.0...0.0...1c.1.12.hp.P5HzmYlymb8"
5048,"https://www.google.com/search?hl=en&noj=1&complete=0&site=webhp&tbs=cdr%3A1%2Ccd_min%3A1%2F1%2F1990%2Ccd_max%3A4%2F26%2F2013&source=hp&q=Where+do+people+cash+fish+standing+on+stilts&oq=Where+do+people+cash+fish+standing+on+stilts&gs_l=hp.3...6153.11392.0.11488.0.0.0.0.0.0.0.0..0.0...0.0...1c.1.12.hp.P5HzmYlymb8"
5052,"https://www.google.com/search?hl=en&noj=1&complete=0&site=webhp&tbs=cdr%3A1%2Ccd_min%3A1%2F1%2F1990%2Ccd_max%3A4%2F26%2F2013&q=Fishing+on+stilts&oq=Fishing+on+stilts&gs_l=serp.3...18709.20917.0.21067.0.0.0.0.0.0.0.0..0.0...0.0...1c.1.12.serp.XDRgia5-AXk"
```

The output will be in the same directory and it will be called output.csv 