export function capitalize(word: string): string {
    return word ? word[0].toUpperCase() + word.substring(1) : ''
}
