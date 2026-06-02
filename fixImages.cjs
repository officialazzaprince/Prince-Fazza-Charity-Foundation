const fs = require('fs');

const replacements = {
  67: '1469571486292-0ba58a3f068b',
  109: '1511632765486-a96cb75a8986',
  189: '1532938911079-1b06ac7ce2ec',
  267: '1593113630400-ea4288922497',
  317: '1603833665858-e61d17a86224',
  433: '1559027615-cd4628902d4a',
  646: '1494883759339-0b042055a4ee',
  811: '1470506028280-a011fb34b6f7',
  850: '1473649085228-583485e6e4d7',
  1023: '1594708761181-7e8ceae8bcad',
  1030: '1594708761181-7e8ceae8bcad',
  1124: '1500305614571-ea5e6d628d01',
  1167: '1487802194600-4b8c6ea3c48a',
  1476: '1585858902193-27ab97c11f7c',
  1477: '1508848130740-413155d0f622',
  1737: '1599059813005-11265ba4b4ce',
  2210: '1610015694295-cd6a32d16eb5',
  2286: '1516087796934-2e917d5940d9',
  2296: '1520697920397-22f28122d4f2',
  2306: '1460355976672-71c3f0a4dbbd',
  2316: '1524672621453-61b8fbfad17a',
  2578: '1469571486292-0ba58a3f068b',
  2588: '1511632765486-a96cb75a8986',
  2598: '1532938911079-1b06ac7ce2ec',
  2608: '1593113630400-ea4288922497',
  2880: '1603833665858-e61d17a86224'
};

let content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');

for (const [lineNumStr, newId] of Object.entries(replacements)) {
  const i = parseInt(lineNumStr) - 1;
  lines[i] = lines[i].replace(/photo-[a-zA-Z0-9-]+/, `photo-${newId}`);
}

fs.writeFileSync('src/App.tsx', lines.join('\n'), 'utf-8');
console.log('Images replaced!');
