import https from 'https';

const idsToTest = [
  '1469571486292-0ba58a3f068b',
  '1511632765486-a96cb75a8986',
  '1532938911079-1b06ac7ce2ec',
  '1593113630400-ea4288922497',
  '1603833665858-e61d17a86224',
  '1559027615-cd4628902d4a',
  '1494883759339-0b042055a4ee',
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
  '1524672621453-61b8fbfad17a'
];

async function checkUrl(id) {
  return new Promise((resolve) => {
    https.get(`https://images.unsplash.com/photo-${id}?w=100`, (res) => {
      resolve({ id, status: res.statusCode });
    }).on('error', () => {
      resolve({ id, status: 0 });
    });
  });
}

async function main() {
  for (const id of idsToTest) {
    const res = await checkUrl(id);
    console.log(res);
  }
}

main();
