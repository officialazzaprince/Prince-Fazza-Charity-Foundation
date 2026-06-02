const fs = require('fs');

// We have unique IDs we can reuse from unique[] or we can just shuffle some valid IDs.
// I'll reuse the unique ones since I know they work and they are completely different.
const uniquePool = [
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
];

const replacements = {
  2578: uniquePool[0],
  919: uniquePool[1],
  253: uniquePool[2],
  232: uniquePool[3],
  2588: uniquePool[4],
  855: uniquePool[5],
  1087: uniquePool[6], // Video cover
  172: uniquePool[7],
  239: uniquePool[8],
  260: uniquePool[9],
  451: uniquePool[10],
  650: uniquePool[11],
  1808: uniquePool[12],
  2598: uniquePool[13],
  457: uniquePool[14],
  648: uniquePool[15],
  439: uniquePool[16],
  647: uniquePool[17],
  1475: uniquePool[18]
};

let content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');

for (const [lineNumStr, newId] of Object.entries(replacements)) {
  const i = parseInt(lineNumStr) - 1;
  lines[i] = lines[i].replace(/photo-[a-zA-Z0-9-]+/, `photo-${newId}`);
}

fs.writeFileSync('src/App.tsx', lines.join('\n'), 'utf-8');
console.log('Second batch of images replaced!');
