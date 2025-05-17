import { Character, Characterizer } from '../../src/libraries/characterizer'
import { rules } from '../../src/libraries/rules'
import {
  Token,
  Tokenizer,
  UnexpectedCharacterError,
} from '../../src/libraries/tokenizer'

describe('tokenizer', () => {
  describe('count tokens', () => {
    it('should detect 3 parts', () => {
      const expression: string = '1+2'
      const characters: Character[] = Characterizer.characterize(
        expression,
        'std:in',
      )
      const tokens: Token[] = Tokenizer.tokenize(characters, rules)
      expect(tokens.length).toBe(3 + 1)
    })
    it('should detect 4 parts', () => {
      const expression: string = '-1+2'
      const characters: Character[] = Characterizer.characterize(
        expression,
        'std:in',
      )
      const tokens: Token[] = Tokenizer.tokenize(characters, rules)
      expect(tokens.length).toBe(4 + 1)
    })
    it('should join number and detect 3 parts', () => {
      const expression: string = '21+24'
      const characters: Character[] = Characterizer.characterize(
        expression,
        'std:in',
      )
      const tokens: Token[] = Tokenizer.tokenize(characters, rules)
      expect(tokens.length).toBe(3 + 1)
    })
    it('should tokenize large expressions', () => {
      const expression: string = '21+24-(2-3)/4'
      const characters: Character[] = Characterizer.characterize(
        expression,
        'std:in',
      )
      const tokens: Token[] = Tokenizer.tokenize(characters, rules)
      expect(tokens.length).toBe(11 + 1)
    })
  })
  describe('check format', () => {
    it('raise error on letters', () => {
      expect(() => {
        const expression: string = '21+2d4'
        const characters: Character[] = Characterizer.characterize(
          expression,
          'std:in',
        )
        Tokenizer.tokenize(characters, rules)
      }).toThrow(UnexpectedCharacterError)
    })
    it('raise error on invalid symbols', () => {
      expect(() => {
        const expression: string = '21+24^2'
        const characters: Character[] = Characterizer.characterize(
          expression,
          'std:in',
        )
        Tokenizer.tokenize(characters, rules)
      }).toThrow(UnexpectedCharacterError)
    })
  })
})
