const fs = require('fs');
let content = fs.readFileSync('src/components/ServicePages.tsx', 'utf-8');
const lines = content.split('\n');

const duplicatesToReplace = [];
const seen = new Set();
lines.forEach((line, index) => {
  const match = line.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/);
  if (match) {
    if (seen.has(match[0])) {
      duplicatesToReplace.push(index + 1);
    } else {
      seen.add(match[0]);
    }
  }
});

duplicatesToReplace.forEach((lineNumStr, index) => {
  const i = parseInt(lineNumStr) - 1;
  const lockId = index + 200; // start lock from 200
  lines[i] = lines[i].replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/, `https://loremflickr.com/800/600/charity,humanitarian?lock=${lockId}`);
});

// Also there might be URLs that duplicate what was in App.tsx! 
// Let's just blindly replace ALL unsplash URLs with loremflickr in ServicePages.tsx that were duplicated. 
// Actually, to guarantee UNIQUENESS ACROSS THE ENTIRE WEBSITE, I should just replace ALL of them except the very first one!

fs.writeFileSync('src/components/ServicePages.tsx', lines.join('\n'), 'utf-8');
console.log('Duplicates in ServicePages replaced!');
