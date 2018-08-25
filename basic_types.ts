const list1: number[] = [1,2,3]
const list2: Array<number> = [1,2,3]

const tupple: [string, number] = ["strings", 1]

enum Color {Red, Green, Blue}
let c: Color = Color.Green

console.log(c)
// => 1

// const noUndef: number = null

let obj: object = {key: "value"}
obj = { foo: "bar" }
let objStrict = {key: "value"} // object型を明記しないとより厳密にチェックされる
// objStrict = { foo: "bar" } // Error

// Type assertions
// asはコンパイル時のみに評価されるのでjsには関係がない
let someValue: any = "This is a string"
let strLength: number = (someValue as string).length