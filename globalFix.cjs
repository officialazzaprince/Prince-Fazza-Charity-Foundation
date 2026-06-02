const fs = require('fs');

const appContent = fs.readFileSync('src/App.tsx', 'utf-8').split('\n');
const serviceContent = fs.readFileSync('src/components/ServicePages.tsx', 'utf-8').split('\n');

const globalSeen = new Set();
let lockCounter = 1000;

function processLines(lines, isApp) {
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/(https:\/\/(images\.unsplash\.com|loremflickr\.com)[^"']*)/);
    if (match) {
      const url = match[0];
      if (globalSeen.has(url)) {
        // Exemptions for SAME article duplicates in App.tsx
        if (isApp && (i === 1022 || i === 1029 || i === 1257 || i === 1262 || i === 1420 || i === 1424)) {
          // Keep it! But lines are i
          continue; 
        }
        lines[i] = lines[i].replace(url, `https://loremflickr.com/800/600/charity,humanitarian?lock=${lockCounter++}`);
      } else {
        globalSeen.add(url);
      }
    }
  }
}

processLines(appContent, true);
processLines(serviceContent, false);

fs.writeFileSync('src/App.tsx', appContent.join('\n'), 'utf-8');
fs.writeFileSync('src/components/ServicePages.tsx', serviceContent.join('\n'), 'utf-8');
console.log('Global fix completed!');
