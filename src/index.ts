import { Character, Characterizer } from "./libraries/characterizer"

const expression: string = '1+2'

const characters: Character[] = Characterizer.characterize(expression, 'std::in')
characters.forEach((character: Character) => {
    console.log(character)
})
