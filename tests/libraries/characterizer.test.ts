import { Character, Characterizer } from '../../src/libraries/characterizer'

describe('characterize', () => {
  it('should return exact number of characters', () => {
    const expression: string = '1+2'
    const characters: Character[] = Characterizer.characterize(
      expression,
      'std:in',
    )
    expect(characters.length).toBe(expression.length)
  })
  it('dot not detects error, joust count characters', () => {
    const expression: string = '1+*2sdf'
    const characters: Character[] = Characterizer.characterize(
      expression,
      'std:in',
    )
    expect(characters.length).toBe(expression.length)
  })
})
