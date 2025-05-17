import { Lexer } from './libraries/lexer'
import { Parser, Tree } from './libraries/parser'
import { rules } from './libraries/rules'
import { Token } from './libraries/tokenizer'

const expression: string = '12+(23-45)/67*89'

console.log('\nTokens:')
const tokens: Token[] = Lexer.lex(expression, rules)
tokens.forEach((token: Token) => {
  console.log(token)
})

console.log('\nTree:')
const tree: Tree = Parser.parse(tokens)
console.log(JSON.stringify(tree, null, 2))

const result: number = Parser.eval(tree)
console.log(`\nResult: ${result}`)
