interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: "Size 10 Object" }
printLabel(myObj)

interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any // 任意のキーを許可したい場合はこうする
}

function createSquare(config: SquareConfig): { color: string, area: number } {
  let newSquare = { color: "white", area: 100}
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
let mySquare = createSquare({ color: "balck", opacity: 0.5 })
let another = createSquare({colour: "red", width: 100}) // Optionalを使っていたりすると、キーをtypoしても通ってしまう場合があるので注意

// function type
interface SearchFunc {
  (source: string, subString: string): boolean
}
const search: SearchFunc = function(src: string, sub:string) {
  return true
}

// Class
interface ClockInterface {
  currentTime: Date
  setTime(d: Date): void
}

class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {
    this.currentTime = new Date()
  }
}

// Extending Interfaces
interface Shape {
  color: string
}
interface PenStroke {
  penWidth: number
}
interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = <Square>{}
square.color = "blue"
square.sideLength = 10
square.penWidth = 5.0