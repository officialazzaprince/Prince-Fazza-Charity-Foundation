const https = require('https');
const fs = require('fs');

https.get('https://unsplash.com/s/photos/charity', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    // Look for images.unsplash.com/photo-[ID]
    const matches = body.match(/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    if(matches) {
       const ids = matches.map(m => m.replace('images.unsplash.com/photo-', ''));
       console.log("Found:", [...new Set(ids)].slice(0, 30));
    } else {
       console.log("no matches");
    }
  });
});
