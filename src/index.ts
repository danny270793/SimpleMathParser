import { Character, Characterizer } from "./libraries/characterizer"
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
        return checkOptions(this.constructor.name, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], characters, position)
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
const tokens: Token[] = Tokenizer.tokenize(characters, rules)
console.log('Characters:')
characters.forEach((character: Character) => {
    console.log(character)
})

console.log('Tokens:')
tokens.forEach((token: Token) => {
    console.log(token)
})
