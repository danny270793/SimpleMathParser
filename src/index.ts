import { Character, Characterizer } from "./libraries/characterizer"
import { Parser, Tree } from "./libraries/parser"
import { rules } from "./libraries/rules"
import { Token, Tokenizer } from "./libraries/tokenizer"

const expression: string = '12+23'

const characters: Character[] = Characterizer.characterize(expression, 'std::in')
console.log('Characters:')
characters.forEach((character: Character) => {
    console.log(character)
})

const tokens: Token[] = Tokenizer.tokenize(characters, rules)
console.log('Tokens:')
tokens.forEach((token: Token) => {
    console.log(token)
})

const tree: Tree = Parser.parse(tokens)
console.log('tree:')
console.log(tree)
