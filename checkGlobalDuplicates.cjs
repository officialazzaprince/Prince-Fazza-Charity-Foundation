const fs = require('fs');

const files = ['src/App.tsx', 'src/components/ServicePages.tsx', 'src/data.ts'];

const seen = {};
let duplicates = 0;

files.forEach(file => {
  if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf-8').split('\n');
    lines.forEach((line, i) => {
      const match = line.match(/(https:\/\/(images\.unsplash\.com|loremflickr\.com)[^"']*)/);
      if (match) {
        const url = match[0];
        if (seen[url]) {
          console.log(`Duplicate found: ${url} at ${file}:${i + 1} (First seen at ${seen[url]})`);
          duplicates++;
        } else {
          seen[url] = `${file}:${i + 1}`;
        }
      }
    });
  }
});
console.log(`Total duplicates: ${duplicates}`);
