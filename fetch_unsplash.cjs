const https = require('https');
https.get('https://unsplash.com/napi/search/photos?query=hospital+recovery+wing&per_page=5', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data).results.map(r => r.id)));
});
