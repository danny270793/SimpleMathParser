import { Character } from "./characterizer"

export interface Token {
    value: string
    rule: string
    column: number
    row: number
}

export class UnexpectedCharacterError extends Error {
    constructor(character: Character) {
        super(`Unexpected character "${character.character}" at ${character.file}:${character.row}:${character.column}`)
    }
}

export interface NextReturn {
    token: Token|undefined
    position: number
}

export interface Rule {
    getNext(characters: Character[], position: number): NextReturn
}

export class Tokenizer {
    static tokenize(characters: Character[], rules: Rule[]): Token[] {
        const tokens: Token[] = []

        let position: number = 0
        while(position < characters.length) {
            let foundValidRule: boolean = false
            for(const rule of rules) {
                const nextReturn: NextReturn = rule.getNext(characters, position)
                if(nextReturn.token) {
                    tokens.push(nextReturn.token)
                    position = nextReturn.position
                    foundValidRule = true
                    break
                }
            }

            if(!foundValidRule) {
                throw new UnexpectedCharacterError(characters[position])
            }
        }
        return tokens
    }
}
