// Intersection Types
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{}
  // classに定義したメソッドはfor inでは取れないようだったので面倒くさいことになっている
  for (const id of Object.getOwnPropertyNames(Object.getPrototypeOf(first))) {
    (<any>result)[id] = (<any>first)[id]
  }
  for (const id of Object.getOwnPropertyNames(Object.getPrototypeOf(second))) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id]
    }
  }
  return result
}
class Person {
  constructor(public name: string) { }
}
interface Loggable {
  log(): void
}
class ConsoleLogger implements Loggable {
  public log() { console.log('test') }
}
const jim = extend(new Person('jim'), new ConsoleLogger())
console.dir(jim)
jim.log()

// Union Types
interface Bird {
  fly(): void
  layEggs(): void
}

interface Fish {
  swim(): void
  layEggs(): void
}

function getPet(type: string): Bird | Fish {
  if (type === "bird") {
    return { fly: () => {}, layEggs: () => {}}
  }
  else {
    return { swim: () => {}, layEggs: () => {} }
  }
}
const pet = getPet('bird')
pet.layEggs() // BirdもFishもlayEggs()を持っているのでOK
// pet.fly() // Fishはfly()できないのでNG

// Fishにキャストしてswimが存在するかチェックするようなガードを通せばOK
// 対象がclassの場合はinstanceofが使える
if ((<Fish>pet).swim) {
  (<Fish>pet).swim()
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // コンパイラがnullの可能性を排除できなくても!で無理やり通すことは可能
  }
  name = name || "Bob";
  return postfix("great");
}

// Type Aliases
// 機能的なinterfaceと大体同じことは実現できる
// このドキュメントのこの項目だけではinterfaceに比べて便利なシーンは分からなかった
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n
  }
  else {
    return n()
  }
}

type Alias = { num: number }
interface Interface { num: number }
declare function aliased(arg: Alias): Alias
declare function interface(arg: Interface): Interface

// Literal Types
type Direction = "left" | "right"
const direction: Direction = "left"

function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
  return 1
}

// Discriminated Unions
interface Square {
  kind: "square"
  size: number
}
interface Rectangle {
  kind: "rectangle"
  width: number
  height: number
}
interface Circle {
  kind: "circle"
  radius: number
}
type Shape2 = Square | Rectangle | Circle

function area(s: Shape2): number { // 戻り値の型をnumberと明示すると、switchで網羅てきていなかった場合にundefinedが還るのでのでエラーとして検知できる
  switch (s.kind) {
    case "square": return s.size * s.size
    case "rectangle": return s.height * s.width
    case "circle": return Math.PI * s.radius * 2
  }
}

// Index types
// keyofを使うとプロパティを列挙できる。genericsと組み合わせると存在しないキーを参照するようなミスを未然に防ぐことができる
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}
interface IPerson {
  name: string
  age: number
}
const jarid: IPerson = { name: 'Jarid', age: 35 }
const props: string[] = pluck(jarid, ['name']) // 仮に存在しない'unknown'を指定した場合はエラーになる 

function getProp<T, K extends keyof T>(o: T, name: K): T[K] { // もう少し簡易的な使い方
  return o[name]
}
const jaridName: string = getProp(jarid, 'name')
// const jaridUnknown = getProp(jarid, 'unknown') // エラー

// Mapped types
