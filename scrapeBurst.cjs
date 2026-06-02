const https = require('https');
https.get('https://burst.shopify.com/photos/search?q=charity', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const matches = body.match(/https:\/\/burst\.shopifycdn\.com\/photos\/[a-zA-Z0-9-]+\.jpg/g);
    if(matches) {
       console.log("Found:", [...new Set(matches)]);
    } else {
       console.log("no matches");
    }
  });
});
