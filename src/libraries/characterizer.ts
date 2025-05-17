export interface Character {
    character: string
    file: string
    column: number
    row: number
}

export class Characterizer {
    static characterize(content: string, file: string): Character[] {
        const parsed: Character[] = []

        const characters: string[] = content.split('')
        let column: number = 1
        let row: number = 1
        for(const character of characters) {
            parsed.push({
                character,
                file,
                column,
                row
            })
            if(character === '\n') {
                column = 1
                row += 1
            } else {
                column += 1
            }
        }
        return parsed
    }
}
