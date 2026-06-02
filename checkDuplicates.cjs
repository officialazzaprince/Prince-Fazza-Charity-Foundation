const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');
const counts = {};

lines.forEach((line, index) => {
  const match = line.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/);
  if (match) {
    const url = match[0];
    if (!counts[url]) counts[url] = [];
    counts[url].push(index + 1);
  }
});

for (const url in counts) {
  if (counts[url].length > 1) {
    console.log(`Duplicate ${url} at lines: ${counts[url].join(', ')}`);
  }
}
