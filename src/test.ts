function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item)
  })
}

const a = []
const b: string = ''
push(a, 1, 2, 3)
console.log(a, b)
