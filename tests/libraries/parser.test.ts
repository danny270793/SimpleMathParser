import { Character, Characterizer } from '../../src/libraries/characterizer'
import { Lexer } from '../../src/libraries/lexer'
import {
  BinaryOperationNode,
  ExpectedCloseParenthesisError,
  Parser,
  Tree,
  UnexpectedTokenError,
} from '../../src/libraries/parser'
import { rules } from '../../src/libraries/rules'
import { Token } from '../../src/libraries/tokenizer'

describe('parser', () => {
  describe('detect operation', () => {
    it('should detect incorrect format with - at end', () => {
      expect(() => {
        const expression: string = '1-2-'
        const tokens: Token[] = Lexer.lex(expression, rules)
        Parser.parse(tokens)
      }).toThrow(UnexpectedTokenError)
    })
    it('should detect missing )', () => {
      expect(() => {
        const expression: string = '1-2-(3+4'
        const tokens: Token[] = Lexer.lex(expression, rules)
        Parser.parse(tokens)
      }).toThrow(ExpectedCloseParenthesisError)
    })
  })
  describe('detect operation', () => {
    it('should detect and addition', () => {
      const expression: string = '1+2'
      const tokens: Token[] = Lexer.lex(expression, rules)
      const tree: Tree = Parser.parse(tokens)
      expect((tree as BinaryOperationNode).operator).toBe('+')
    })
    it('should detect and substraction', () => {
      const expression: string = '1-2'
      const tokens: Token[] = Lexer.lex(expression, rules)
      const tree: Tree = Parser.parse(tokens)
      expect((tree as BinaryOperationNode).operator).toBe('-')
    })
  })
  describe('computes result', () => {
    it.each([
      ['1+2', 3],
      ['1+2*(3-4)', -1],
      ['(1+2)*(3-4)', -3],
    ])('should evaluate %s to %d', (expression, expected) => {
      const tokens: Token[] = Lexer.lex(expression, rules)
      const tree: Tree = Parser.parse(tokens)
      const result: number = Parser.eval(tree)
      expect(result).toBe(expected)
    })
  })
})
