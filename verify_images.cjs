const https = require('https');
const urls = [
  '1488521787991-ed7bbaae773c', // Charity
  '1469571486292-0ba58a3f068b', // Volunteers
  '1559027615-cd4628902d4a', // Default
  '1573164713619-24cb7154abcb', // Meeting/Inspiring
  '1556761175-5973dc0f32f7', // Visionary/Legacy
  '1521791136064-7986c2920216', // Support center / contact
  '1516321497487-31304c4c23db', // Support / welcoming space
  '1423666639041-f56000c27a9a', // business/founder
  '1560250097-0b93528c311a'  // current founder
];

urls.forEach(id => {
  https.get(`https://images.unsplash.com/photo-${id}?w=1600&q=80`, res => {
    console.log(id, res.statusCode);
  });
});
