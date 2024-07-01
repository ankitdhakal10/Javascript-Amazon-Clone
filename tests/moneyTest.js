import formatCurrency from '../scripts/utils/money.js';

console.log('Test suite: ');

console.log('Convert cents into dollars: ');

if(formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('Case for 0 cents: ');

if(formatCurrency(0) === '0') {
  console.log('passed');
} else {
  console.log('failed');
}