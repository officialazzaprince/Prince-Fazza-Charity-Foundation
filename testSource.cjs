const https = require('https');
https.get('https://source.unsplash.com/800x600/?charity', (res) => {
  console.log("Status:", res.statusCode);
  console.log("Location:", res.headers.location);
});
