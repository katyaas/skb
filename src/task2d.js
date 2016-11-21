import hsl from 'hsl-to-hex';

function toHex(str) {
  let res = parseInt(str).toString(16);
  if (res.length === 1) {
    res = '0' + res;
  }
  return res;
}

function check(str) {
  return parseInt(str) <= 255;

}

export function task2d(colorParam) {
  const invalidColor = 'Invalid color';
  if (!colorParam) {
    return invalidColor;
  }
  console.log('colorParam', colorParam);
  const color = colorParam.toLowerCase().replace(/ +/g, '').replace('%23', '#').replace(/\s+/g, '').replace(/%20/g, '');
  console.log('color', color);

  const parsedHsl = color.match(/^hsl\(([0-9]{1,3}),([0-9]{1,3})%,([0-9]{1,3})%\)$/);
  console.log('parsed color HSL', parsedHsl);
  if (parsedHsl && parsedHsl[1] && parsedHsl[2] && parsedHsl[3]) {
    if (parseInt(parsedHsl[1]) > 360 || parseInt(parsedHsl[2]) > 100 || parseInt(parsedHsl[3]) > 100) {
      return invalidColor;
    }
    const hex = hsl(parsedHsl[1], parsedHsl[2], parsedHsl[3]);
    return hex;
  }

  const parsedRgb = color.match(/^rgb\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})\)$/);
  console.log('parsed color RGB', parsedRgb);
  if (parsedRgb && parsedRgb[1] && parsedRgb[2] && parsedRgb[3]) {
    if (check(parsedRgb[1]) && check(parsedRgb[2]) && check(parsedRgb[3])) {
      return "#" + toHex(parsedRgb[1]) + toHex(parsedRgb[2]) + toHex(parsedRgb[3]);
    }
    return invalidColor;
  }

  const re3 = new RegExp('^#?([0-9a-f]{3})$', 'i');
  const parsed3 = color.match(re3);
  console.log('parsed color 3', parsed3);
  if (parsed3 && parsed3[1]) {

    return "#" + parsed3[1][0] + parsed3[1][0] + parsed3[1][1] + parsed3[1][1]+
      parsed3[1][2] + parsed3[1][2];
  }

  const re = new RegExp('^#?([0-9a-f]{6})$', 'i');
  const parsed = color.toLowerCase().match(re);
  console.log('parsed color', parsed);
  if (parsed && parsed[1]) {
    return `#${parsed[1]}`;
  }
  return invalidColor;
}




const testData = [
  ['aaafff', '#aaafff', 1],
  ['000fff', '#000fff', 2],
  ['ABCDEF', '#abcdef', 3],
  ['1A2B3C', '#1a2b3c', 4],
  ['000000', '#000000', 5],//5
  ['fff', '#ffffff', 6],
  ['abc', '#aabbcc', 7],
  ['000', '#000000', 8],
  [' abcdef', '#abcdef', 9],
  ['  abcdef ', '#abcdef', 10],//10
  ['-123456', 'Invalid color', 11],
  ['00', 'Invalid color', 12],
  ['', 'Invalid color', 13],
  ['bcdefg', 'Invalid color', 14],
  ['abcdeff', 'Invalid color', 15],//15
  ['0bcdeff', 'Invalid color', 16],
  ['abcd', 'Invalid color', 18],
  ['%23ababab', '#ababab', 19],
  ['%23aba', '#aabbaa', 20], //20
  ['%23232323', '#232323', 21],
  ['%23%23ababab', 'Invalid color', 22],
  ['%23abcd', 'Invalid color', 23],
  ['rgb(0, 255, 64)', '#00ff40', 24],
  [' rgb( 0, 255 , 64 )', '#00ff40', 27],
  ['rgb(128, 128, 257)', 'Invalid color', 28],
  ['hsl(195, 100%, 50%)', '#00bfff', 33],
];

export function testTask2d() {
  console.log('testTask2d');
  let fullRes = [];
  testData.forEach((color) => {
    console.log(color);
    const res = task2d(color[0]);
    fullRes.push({onum: color[3], color: color[0], res, testResult: color[1] === res})
  });
  return fullRes;
}
