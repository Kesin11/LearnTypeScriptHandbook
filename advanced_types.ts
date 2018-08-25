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