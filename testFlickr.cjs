const https = require('https');
https.get('https://loremflickr.com/800/600/charity,humanitarian?random=1', (res) => {
  console.log("Status:", res.statusCode);
  if (res.statusCode >= 300 && res.statusCode < 400) {
    console.log("Redirects to:", res.headers.location);
  }
});
