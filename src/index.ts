import { Character, Characterizer } from "./libraries/characterizer"
import { Parser, Tree } from "./libraries/parser"
import { NextReturn, Rule, Token, Tokenizer } from "./libraries/tokenizer"

function checkOptions(ruleName: string, options: string[], characters: Character[], position: number): NextReturn {
    if(options.includes(characters[position].character)) {
        return {
            token: {
                value: characters[position].character,
                rule: ruleName,
                column: characters[position].column,
                row: characters[position].row
            },
            position: position + 1
        }
    }
    return {
        token: undefined,
        position
    }
}

class Number implements Rule {
    getNext(characters: Character[], position: number): NextReturn {
        const value: Character[] = []

        while(/^[0-9]$/.test(characters[position].character)) {
            value.push(characters[position])
            position += 1

            if(position === characters.length) {
                break
            }
        }
        if(value.length === 0) {
            return {
                token: undefined,
                position
            }
        }
        return {
            token: {
                value: value.map((value: Character) => value.character).join(''),
                rule: this.constructor.name,
                column: value[0].column,
                row: value[0].row
            },
            position
        }
    }
}

class MathOperator implements Rule {
    getNext(characters: Character[], position: number): NextReturn {
        return checkOptions(this.constructor.name, ['+', '-', '/', '*'], characters, position)
    }
}

const rules: Rule[] = [
    new Number(),
    new MathOperator()
]

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
