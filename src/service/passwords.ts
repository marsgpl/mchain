import CryptoJS from 'crypto-js'
import { newId } from 'lib/newId'
import { NewPasswordProps, Password, Passwords } from 'model/Password'
import { LOCAL_STORAGE_PASSWORDS_IV, LOCAL_STORAGE_PASSWORDS } from 'defs/localStorage'

const AES_IV_BYTES = 16

export type PasswordIV = CryptoJS.lib.WordArray

export function newPassword(props?: NewPasswordProps): Password {
    return {
        id: props?.id || newId(),
        title: '',
    }
}

export function loadPasswords(key: string, iv: PasswordIV): Passwords {
    const encrypted = readPasswords()

    if (encrypted === null) {
        return []
    }

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv })
    const decoded = decrypted.toString(CryptoJS.enc.Utf8)
    const parsed = JSON.parse(decoded)

    if (!Array.isArray(parsed)) {
        throw Error
    }

    return parsed as Passwords
}

export function savePasswords(passwords: Passwords, key: string, iv: PasswordIV) {
    const message = JSON.stringify(passwords)
    const encrypted = CryptoJS.AES.encrypt(message, key, { iv }).toString()

    localStorage.setItem(LOCAL_STORAGE_PASSWORDS, encrypted)
}

export function passwordToSearchChunk({
    title,
    username,
}: Password): string {
    return [
        title,
        username,
    ].join('\n').toLowerCase()
}

export function searchQueryToChunks(searchQuery: string): string[] {
    return searchQuery.trim().toLowerCase().split(/[\s\n]+/g)
}

export function getPasswordsIv(): PasswordIV {
    const hex = readPasswordsIv()

    if (hex) {
        return CryptoJS.enc.Hex.parse(hex)
    } else {
        const iv = CryptoJS.lib.WordArray.random(AES_IV_BYTES)
        const hex = CryptoJS.enc.Hex.stringify(iv)
        savePasswordsIv(hex)
        return iv
    }
}

export function savePasswordsIv(hexIv: string) {
    localStorage.setItem(LOCAL_STORAGE_PASSWORDS_IV, hexIv)
}

export function erasePasswords() {
    localStorage.removeItem(LOCAL_STORAGE_PASSWORDS)
}

export function erasePasswordsIv() {
    localStorage.removeItem(LOCAL_STORAGE_PASSWORDS_IV)
}

export function readPasswords() {
    return localStorage.getItem(LOCAL_STORAGE_PASSWORDS)
}

export function readPasswordsIv() {
    return localStorage.getItem(LOCAL_STORAGE_PASSWORDS_IV)
}
