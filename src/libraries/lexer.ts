import { Character, Characterizer } from './characterizer'
import { Rule, Token, Tokenizer } from './tokenizer'

export class Lexer {
  static lex(
    expression: string,
    rules: Rule[],
    file: string = 'std:in',
  ): Token[] {
    const characters: Character[] = Characterizer.characterize(expression, file)
    return Tokenizer.tokenize(characters, rules)
  }
}
