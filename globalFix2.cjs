const fs = require('fs');

const appContent = fs.readFileSync('src/App.tsx', 'utf-8').split('\n');
const serviceContent = fs.readFileSync('src/components/ServicePages.tsx', 'utf-8').split('\n');
const dataContent = fs.readFileSync('src/data.ts', 'utf-8').split('\n');

const globalSeen = new Set();
let lockCounter = 2000;

function processLines(lines, isApp) {
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/(https:\/\/(images\.unsplash\.com|loremflickr\.com)[^"']*)/);
    if (match) {
      const url = match[0];
      if (globalSeen.has(url)) {
        if (isApp && (i === 1022 || i === 1029 || i === 1257 || i === 1262 || i === 1420 || i === 1424)) {
          continue; 
        }
        lines[i] = lines[i].replace(url, `https://loremflickr.com/800/600/charity,humanitarian?lock=${lockCounter++}`);
      } else {
        globalSeen.add(url);
      }
    }
  }
}

// process App.tsx first so its original ones get priority
processLines(appContent, true);
processLines(serviceContent, false);
processLines(dataContent, false);

fs.writeFileSync('src/data.ts', dataContent.join('\n'), 'utf-8');
console.log('Global fix completed over data.ts too!');
