const https = require('https');
https.get('https://loremflickr.com/800/600/charity,humanitarian?lock=1', (res) => {
  console.log("Status:", res.statusCode);
  console.log("Redirects to:", res.headers.location);
});
