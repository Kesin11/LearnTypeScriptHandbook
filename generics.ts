function identity<T>(arg: T): T {
  return arg
}

// const output = identity<string>("myString")
const output = identity("myString") // 型推論してくれる

interface GenericIdentitiFn<T> {
  (agr: T): T
}
const myIdentity: GenericIdentitiFn<number> = identity // インターフェースにしてこの段階で型を与えることも可能

// Generic Classes
interface IGenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}
class NumberClass implements IGenericNumber<number> {
  zeroValue: number
  constructor() {
    this.zeroValue = 0
  }
  add(x: number, y: number) {
    return x + y
  }
}
class StringClass implements IGenericNumber<string> {
  zeroValue: string
  constructor() {
    this.zeroValue = ""
  }
  add(x: string, y: string) {
    return x + y
  }
}
const num = new NumberClass()
num.add(1, 2)

const str = new StringClass()
str.add("x", "y")
