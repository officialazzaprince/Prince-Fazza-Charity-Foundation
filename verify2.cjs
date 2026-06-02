const https = require('https');
const ids = ['1593113598332-cd288d649433', '1556761175-5973dc0f32f7', '1516321497487-31304c4c23db', '1531206715517-5c56108159e6'];
ids.forEach(id => {
  https.request(`https://images.unsplash.com/photo-${id}?w=10`, {method: 'HEAD'}, res => {
    console.log(id, res.statusCode);
  }).end();
});
