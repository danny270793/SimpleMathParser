import { Character, Characterizer } from './libraries/characterizer'
import { Parser, Tree } from './libraries/parser'
import { rules } from './libraries/rules'
import { Token, Tokenizer } from './libraries/tokenizer'

const expression: string = '12+(23-45)/67*89'

console.log('Characters:')
const characters: Character[] = Characterizer.characterize(
  expression,
  'std::in',
)
characters.forEach((character: Character) => {
  console.log(character)
})

console.log('\nTokens:')
const tokens: Token[] = Tokenizer.tokenize(characters, rules)
tokens.forEach((token: Token) => {
  console.log(token)
})

console.log('\nTree:')
const tree: Tree = Parser.parse(tokens)
console.log(JSON.stringify(tree, null, 2))

const result: number = Parser.eval(tree)
console.log(`\nResult: ${result}`)
