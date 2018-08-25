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

// 任意のクラスのインスタンスを返す関数をgenericsで表現する場合
// https://github.com/Microsoft/TypeScript/wiki/FAQ#why-cant-i-write-typeof-t-new-t-or-instanceof-t-in-my-generic-function
class Dog {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
// genericsの情報はjsにしたときに消えてしまうので、new T()とは書けない
// new()を持つオブジェクトの型としてTを表現するところがポイント
function create<T>(ctor: { new(name: string): T }, name: string): T {
  return new ctor(name)
}

const dog = create(Dog, 'one')
console.log(dog)