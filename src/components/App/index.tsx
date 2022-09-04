import React from 'react'
import { NewPasswordPage } from 'pages/NewPasswordPage'
import { PasswordPage } from 'pages/PasswordPage'
import { PasswordsPage } from 'pages/PasswordsPage'
import { Route, Routes } from 'react-router-dom'
import { Password, Passwords } from 'model/Password'
import { ROUTE_NEW_PASSWORD, ROUTE_PASSWORDS, ROUTE_PASSWORD_BY_ID } from 'defs/routes'
import { loadPasswords, savePasswords, getPasswordsIv, PasswordIV } from 'service/passwords'
import { RequestKeyPage } from 'pages/RequestKeyPage'
import { LoadingPage } from 'pages/LoadingPage'

export function App() {
    const [key, setKey] = React.useState<string>()
    const [iv, setIv] = React.useState<PasswordIV>()
    const [passwords, setPasswords] = React.useState<Passwords>()

    React.useEffect(() => {
        if (!key) { return }

        try {
            const iv = getPasswordsIv()
            const passwords = loadPasswords(key, iv)

            setIv(iv)
            setPasswords(passwords)
        } catch (error) {
            throw Error('Decoding failed', {
                cause: error instanceof Error ? error : Error(String(error)),
            })
        }
    }, [key])

    if (!key) {
        return <RequestKeyPage onSubmit={setKey} />
    }

    if (passwords === undefined) {
        return <LoadingPage />
    }

    const createPassword = (password: Password) => {
        const newPasswords = !passwords ? [password] : [...passwords, password]
        setPasswords(newPasswords)
        savePasswords(newPasswords, key, iv!)
    }

    const deletePassword = (passwordId: string) => {
        const newPasswords = !passwords ? [] : passwords.filter(p => p.id !== passwordId)
        setPasswords(newPasswords)
        savePasswords(newPasswords, key, iv!)
    }

    const savePassword = (password: Password) => {
        const { id } = password
        const newPasswords = !passwords ? [password] : passwords.map(p => p.id === id ? password : p)
        setPasswords(newPasswords)
        savePasswords(newPasswords, key, iv!)
    }

    return (
        <Routes>
            <Route index element={<PasswordsPage
                passwords={passwords}
            />} />

            <Route path={ROUTE_PASSWORDS} element={<PasswordsPage
                passwords={passwords}
            />} />

            <Route path={ROUTE_NEW_PASSWORD} element={<NewPasswordPage
                onCreate={createPassword}
            />} />

            <Route path={ROUTE_PASSWORD_BY_ID} element={<PasswordPage
                passwords={passwords}
            />} />
        </Routes>
    )
}
