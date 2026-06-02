const fs = require('fs');

const unsplashIds = [
  '1505751172876-fa1923c5c528',
  '1600585154340-be6161a56a0c',
  '1517245386807-bb43f82c33c4',
  '1576091158221-1241f92e22fc',
  '1489659639091-8b687bc4386e',
  '1469571486040-af250c558d63',
  '1519494026892-80bbd2d6fd0d',
  '1579684389783-bdf560104271',
  '1541816521255-ff76dbc5c120',
  '1427504494785-3a9ca7044f45',
  '1524178232363-1fb2b075b655',
  '1522202176988-66273c2fd55f',
  '1532629345422-7515f3d16bb6',
  '1559027615-cd4628902d4a',
  '1576765608535-5f04d1e3f289',
  '1497633762265-9d179a990aa6',
  '1584515906207-fd664b1c585a',
  '1494883759339-0b042055a4ee',
  '1532601224476-15c79f2f7a51',
  '1469571486292-0ba58a3f068b',
  '1511632765486-a96cb75a8986',
  '1532938911079-1b06ac7ce2ec',
  '1593113630400-ea4288922497',
  '1603833665858-e61d17a86224',
  '1470506028280-a011fb34b6f7',
  '1473649085228-583485e6e4d7',
  '1594708761181-7e8ceae8bcad',
  '1500305614571-ea5e6d628d01',
  '1487802194600-4b8c6ea3c48a',
  '1585858902193-27ab97c11f7c',
  '1508848130740-413155d0f622',
  '1599059813005-11265ba4b4ce',
  '1610015694295-cd6a32d16eb5',
  '1516087796934-2e917d5940d9',
  '1520697920397-22f28122d4f2',
  '1460355976672-71c3f0a4dbbd',
  '1524672621453-61b8fbfad17a',
  '1513258496099-48168024addd',
  '1509062522246-3755977927d7',
  '1557200134-90327ee9fafa',
  '1522071820081-009f0129c71c',
  '1434030216411-0b793f4b4173',
  '1448697517561-56580f124ec0',
  '1551076805-e1869033e561',
  '1538108156887-54de9eec20be',
  '1544127993-37dbfe43562a',
  '1519689680058-324335c77eb2',
  '1518152006812-cdff2f414c81',
];

let currentIndex = 0;

function replaceLoremFlickr(filename) {
  if (!fs.existsSync(filename)) return;
  
  let content = fs.readFileSync(filename, 'utf-8');
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    // some lines might have multiple? Or just one. Match until all replaced.
    while (lines[i].includes('https://loremflickr.com')) {
      // Find exact URL
      const match = lines[i].match(/(https:\/\/loremflickr\.com[^"']*)/);
      if (match) {
        const id = unsplashIds[currentIndex % unsplashIds.length];
        currentIndex++;
        lines[i] = lines[i].replace(match[0], `https://images.unsplash.com/photo-${id}?w=800&q=80`);
      } else {
        break; // safety break
      }
    }
  }
  
  fs.writeFileSync(filename, lines.join('\n'), 'utf-8');
}

replaceLoremFlickr('src/App.tsx');
replaceLoremFlickr('src/components/ServicePages.tsx');
replaceLoremFlickr('src/data.ts');

console.log(`Replaced all loremflickr URLs with premium Unsplash URLs. (Used ${currentIndex} IDs)`);
