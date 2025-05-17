import { Token } from './tokenizer'

export type NumberNode = { type: 'Number'; value: number }
export type BinaryOperationNode = {
  type: 'BinaryOperation'
  left: Tree
  right: Tree
  operator: string
}
export type Tree = NumberNode | BinaryOperationNode

export class Parser {
  static parse(tokens: Token[]): Tree {
    const parser: ASTParser = new ASTParser(tokens)
    return parser.parse()
  }
  static eval(tree: Tree): number {
    switch (tree.type) {
      case 'Number':
        return tree.value
      case 'BinaryOperation':
        const left: number = this.eval(tree.left)
        const right: number = this.eval(tree.right)
        switch (tree.operator) {
          case '+':
            return left + right
          case '-':
            return left - right
          case '*':
            return left * right
          case '/':
            return left / right
          default:
            throw new Error(`Unknown operator: ${tree.operator}`)
        }
    }
  }
}

export class ExpectedCloseParenthesisError extends Error {
  constructor(token: Token) {
    super(
      `Expected ")" but "${token.value}" was found at ${token.file}:${token.row}:${token.column}`,
    )
  }
}

export class UnexpectedTokenError extends Error {
  constructor(token: Token) {
    super(
      `Unexpected token "${token.value}" at ${token.file}:${token.row}:${token.column}`,
    )
  }
}

class ASTParser {
  private position: number = 0
  private tokens: Token[]
  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  private peek(): Token {
    return this.tokens[this.position]
  }

  private consume(): Token {
    return this.tokens[this.position++]
  }

  private getPrecedence(op: string): number {
    switch (op) {
      case '+':
      case '-':
        return 1
      case '*':
      case '/':
        return 2
      default:
        return 0
    }
  }

  private parseExpression(precedence: number): Tree {
    let left: Tree = this.parsePrimary()
    while (true) {
      const token: Token = this.peek()
      if (token.rule !== 'MathOperator') {
        break
      }

      const tokenPrecedence: number = this.getPrecedence(token.value)
      if (tokenPrecedence <= precedence) {
        break
      }

      const op: string = this.consume().value
      const right: Tree = this.parseExpression(tokenPrecedence)

      left = {
        type: 'BinaryOperation',
        operator: op,
        left,
        right,
      }
    }
    return left
  }

  private parsePrimary(): Tree {
    const token: Token = this.consume()
    if (token.rule === 'Number') {
      return { type: 'Number', value: parseInt(token.value, 10) }
    } else if (token.rule === 'Symbol' && token.value === '(') {
      const expr: Tree = this.parseExpression(0)
      const next: Token = this.consume()
      if (next.rule !== 'Symbol' || next.value !== ')') {
        throw new ExpectedCloseParenthesisError(next)
      }
      return expr
    } else {
      throw new UnexpectedTokenError(token)
    }
  }

  public parse(): Tree {
    return this.parseExpression(0)
  }
}
