const https = require('https');
https.get('https://images.unsplash.com/photo-random?q=80', (res) => {
  console.log("Status:", res.statusCode);
});
