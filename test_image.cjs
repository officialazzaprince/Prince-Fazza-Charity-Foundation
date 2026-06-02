const https = require('https');
const ids = ['1584515979956-654cb2fb4f55', '1304369062369-0fa4b149b5ae', '1582717011985-06cba6e37a85', '1631815589968-fdb09a223b1e', '1579684385127-1ef15d508118'];
ids.forEach(id => {
  https.get(`https://images.unsplash.com/photo-${id}?q=80&w=600`, (res) => {
    console.log(`${id}: ${res.statusCode}`);
  }).on('error', (e) => console.log(e));
});
