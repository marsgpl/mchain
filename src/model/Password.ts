import CryptoJS from 'crypto-js'

export interface Password {
    id: string
    title: string
    username?: string
    password?: string
}

export type NewPasswordProps = Partial<Pick<Password, 'id'>>

export type Passwords = Password[]

export type PasswordsIV = CryptoJS.lib.WordArray
