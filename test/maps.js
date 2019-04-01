let actitivites = new Map();


actitivites.set('1', 'test')
          .set('2', 'asd')
          .set('5', 'ok')
          .set('func', 5)

for(let [key, value] of actitivites){
  console.log(`${key} is ${value}`);
}

console.log('----------');
console.log(actitivites.size);
console.log('----------');

const arr = [
  [1, 2],
  [3, 4],
  [5, 6]
];

const anotherMap = new Map(arr)
for(let [key, value] of anotherMap){
  console.log(`${key}: ${value}`);
}
console.log('---------');

actitivites.forEach( (key, value, map) =>{
  console.log(`FE: ${key}: ${value} || ${map.has(value)}`);
} )