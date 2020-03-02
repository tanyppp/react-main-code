const pathToReg = require('path-to-regexp');

const str = '/about/1/2';
const keys = [];
const reg = pathToReg('/about/:id/:name', keys, {
  end: true
});

const [url, ...values] = str.match(reg);
const nameArr = keys.map(item => item.name);

console.log(url, values);
console.log(nameArr);
console.log(values.reduce((next, item, curIndex) => {
  next[nameArr[curIndex]] = item;
  return next;
}, {}))

console.log(pathToReg('', [], { end: false }).test('/dw/f/wf//fw/fqw//q'))
