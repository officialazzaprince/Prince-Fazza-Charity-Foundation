const https = require('https');

const candidates = [
  '1488521787991-ed7bbaae773c', // Charity
  '1532601224476-15c79f2f7a51', // Medical
  '1544005313-94ddf0286df2', // Happy African children
  '1517048676732-d65bc937f952', // Happy Africans
  '1454165804606-c3d57bc86b40', // Working/planning
  '1505751172876-fa1923c5c528', // Charity hands
  '1517245386807-bb43f82c33c4', // Charity planning
  '1524178232363-1fb2b075b655', // Healthcare
  '1469571486040-af250c558d63', // Kids running
  '1531206715517-5c0ba140b2b8', // People outdoors
  '1491438590914-bc09fcaaf77a', // Group of people
  '1528698827591-e59cd3e54bba', // Kids smiling
  '1596443686812-2f45229eebc3', // Smiling women
];

const valid = [];
let pending = candidates.length;

candidates.forEach(id => {
  https.get(`https://images.unsplash.com/photo-${id}?w=10`, (res) => {
    if (res.statusCode === 200) {
      valid.push(id);
    }
    pending--;
    if (pending === 0) {
      console.log("Valid IDs:", JSON.stringify(valid));
    }
  }).on('error', () => {
    pending--;
    if (pending === 0) console.log("Valid IDs:", JSON.stringify(valid));
  });
});
