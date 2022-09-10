/**
 * no backslash
 * no single/double/back quote
 */
export const RANDOM_PASSWORD_ALPHABET = (
    + 'abcdefghijklmnopqrstuvwxyz'
    + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    + '0123456789'
    + '_,.-~=+#$%&@*^;:!?|/()[]{}<>'
).split('')

export const RANDOM_PASSWORD_MIN_LEN = 20
export const RANDOM_PASSWORD_MAX_LEN = 30
