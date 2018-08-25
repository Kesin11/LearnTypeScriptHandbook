// Optional Parameters
function buildName(first: string, last?: string) {
  if (last) {
    return first + " " + last
  }
  return first
}

buildName("Bob")
buildName("Bob", "Adams")

// Default Parameters
// デフォルトパラメータの型は自動的にOptionalになる
function buildNameDefault(first: string, last = "Default") {
  return first + " " + last
}

buildNameDefault("Bob")

// Rest Parameters
function buildNamesRest(first: string, ...rests: string[]) {
  return first + " " + rests.join(" ")
}

const employeees = buildNamesRest("Joseph", "Samul", "Lucas", "MacKinzie")
console.log(employeees)

// Overload
interface Card {
  suit: "h" | "s" | "c" | "d"
  card: number
}
// オーバーロードの宣言をして実装をする
function pickCard(x: Card[]): number
function pickCard(x: number): Card
function pickCard(x: number | Card[]): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() / x.length)
    return pickedCard
  }
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13) 
    const suits = ["h", "s", "c", "d"]
    return { suit: suits[pickedSuit], card: x % 13}
  }
}

let myDeck: Card[] = [{suit: "h", card: 2}, { suit: "s", card: 10}, {suit: "h", card: 4}]
let pickedCard1 = myDeck[pickCard(myDeck)]
console.log(`card: ${pickedCard1.card} of ${pickedCard1.suit}`)

let pickedCard2 = pickCard(15)
console.log(`card: ${pickedCard2.card} of ${pickedCard2.suit}`)