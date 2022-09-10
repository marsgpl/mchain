import { randomInteger } from './randomInteger'

export function randomString(
    alphabet: string[],
    minLen: number,
    maxLen: number,
): string {
    const len = randomInteger(minLen, maxLen)
    const lastIdx = alphabet.length - 1

    if (len < 1 || lastIdx < 0) {
        return ''
    }

    return Array.from(Array(len), () => alphabet[randomInteger(0, lastIdx)]).join('')
}
