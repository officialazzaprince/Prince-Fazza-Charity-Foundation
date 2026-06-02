const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');

// The line numbers with duplicates to be replaced by loremflickr
const duplicatesToReplace = [
  95, 102, 116, 123, 130, 137, 144, 165, 182, 203, 
  210, 217, 224, 267, 317, 433, 439, 445, 644, 646, 
  649, 1911, 1975, 1981, 1987, 1993
];

duplicatesToReplace.forEach((lineNumStr, index) => {
  const i = parseInt(lineNumStr) - 1;
  const lockId = index + 100; // start lock from 100 to avoid common ones
  lines[i] = lines[i].replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/, `https://loremflickr.com/800/600/charity,humanitarian?lock=${lockId}`);
});

fs.writeFileSync('src/App.tsx', lines.join('\n'), 'utf-8');
console.log('Third batch of images replaced with LoremFlickr!');
