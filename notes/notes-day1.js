// say()

// Object.freeze()

// const obj = {
//   [computedFieldName]: x
// }

// const clone = Object.assign({}, obj)
// const clone2 = {
//   ...obj (spread operator)
// }

// const { first } = obj

// Object.defineProperty(obj, 'age', {
//   writeable: false,
//   value: x,
//   // configurable: false (decides if you can delete or change property),
//   // enumerable: false (can't be iterated)
// });

// getters are read-only. used in objects

// object.function.call({ name: 'Joe' }, 'Brian', 'Paris')
// Call function defines what 'this' was
// object.function.apply works the same except parameters would have to be in an array

// object.function.bind()

// 'this' must be used directly inside an objects method. use arrow function to make it work

// const obj = Object.create(parent) (inherit keys/values from parent object)

// hasownproperty to only iterate object content (not prototype)

// get properties of cuntciont with Function.prototype

// Create object from Function by calling new kw on the function

// classes are functions in js

// use async await to get all necessary APIs - very much used