// Generates simple PNG icons (indigo rounded square with pixel-art "E") using only node:zlib.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};

const LETTER = [
  '11111',
  '10000',
  '10000',
  '11110',
  '10000',
  '10000',
  '11111',
];

function makePng(size) {
  const rows = [];
  const bg = [79, 70, 229]; // indigo-600
  const fg = [255, 255, 255];
  const lw = LETTER[0].length;
  const lh = LETTER.length;
  const cell = Math.floor(size / 8);
  const ox = Math.floor((size - lw * cell) / 2);
  const oy = Math.floor((size - lh * cell) / 2);
  const radius = Math.floor(size * 0.2);
  const px = (x, y) => {
    // rounded corners
    const r = radius;
    const inCorner =
      (x < r && y < r && (x - r) ** 2 + (y - r) ** 2 > r * r) ||
      (x >= size - r && y < r && (x - (size - r - 1)) ** 2 + (y - r) ** 2 > r * r) ||
      (x < r && y >= size - r && (x - r) ** 2 + (y - (size - r - 1)) ** 2 > r * r) ||
      (x >= size - r && y >= size - r && (x - (size - r - 1)) ** 2 + (y - (size - r - 1)) ** 2 > r * r);
    if (inCorner) return [0, 0, 0, 0];
    const lx = Math.floor((x - ox) / cell);
    const ly = Math.floor((y - oy) / cell);
    const on = lx >= 0 && lx < lw && ly >= 0 && ly < lh && LETTER[ly][lx] === '1';
    const [rr, gg, bb] = on ? fg : bg;
    return [rr, gg, bb, 255];
  };
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4);
    row[0] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = px(x, y);
      row.writeUInt8(r, 1 + x * 4);
      row.writeUInt8(g, 2 + x * 4);
      row.writeUInt8(b, 3 + x * 4);
      row.writeUInt8(a, 4 + x * 4);
    }
    rows.push(row);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(Buffer.concat(rows), { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync('public', { recursive: true });
for (const size of [192, 512]) {
  writeFileSync(`public/icon-${size}.png`, makePng(size));
  console.log(`public/icon-${size}.png written`);
}
