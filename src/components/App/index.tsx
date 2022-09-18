import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NewPasswordPage } from 'pages/NewPasswordPage'
import { PasswordPage } from 'pages/PasswordPage'
import { PasswordsPage } from 'pages/PasswordsPage'
import { Password, Passwords } from 'model/Password'
import { ROUTE_NEW_PASSWORD, ROUTE_PASSWORDS, ROUTE_PASSWORD_BY_ID } from 'defs/routes'
import { loadPasswords, savePasswords, getPasswordsIv, PasswordsIV } from 'service/passwords'
import { RequestKeyPage } from 'pages/RequestKeyPage'
import { LoadingPage } from 'pages/LoadingPage'
import { Toast as ToastModel } from 'model/Toast'
import { ActionMenu as ActionMenuModel } from 'model/ActionMenu'
import { Toast } from 'components/Toast'
import { SetToastContext } from 'hooks/useToast'
import { SetActionMenuContext } from 'hooks/useActionMenu'
import { ActionMenu } from 'components/ActionMenu'
import { stringifyError } from 'lib/stringifyError'

export function App() {
    const [key, setKey] = React.useState<string>()
    const [passwordsIv, setPasswordsIv] = React.useState<PasswordsIV>()
    const [passwords, setPasswords] = React.useState<Passwords>()
    const [toast, setToast] = React.useState<ToastModel>()
    const [actionMenu, setActionMenu] = React.useState<ActionMenuModel>()

    React.useEffect(() => {
        if (!key) { return }

        try {
            const iv = getPasswordsIv()
            const passwords = loadPasswords(key, iv)

            setPasswordsIv(iv)
            setPasswords(passwords)
        } catch (error) {
            throw Error('Decoding failed', {
                cause: Error(stringifyError(error)),
            })
        }
    }, [key])

    const renderContent = () => {
        if (!key) {
            return <RequestKeyPage onSubmit={setKey} />
        }

        if (passwords === undefined) {
            return <LoadingPage />
        }

        const createPassword = (password: Password) => {
            const newPasswords = !passwords ? [password] : [...passwords, password]
            setPasswords(newPasswords.sort(({ title: t1 }, { title: t2 }) => t1 === t2 ? 0 : (t1 > t2 ? 1 : -1)))
            savePasswords(newPasswords, key, passwordsIv!)
        }

        const deletePassword = (passwordId: string): boolean => {
            if (!window.confirm('Delete?')) { return false }

            const newPasswords = !passwords ? [] : passwords.filter(p => p.id !== passwordId)
            setPasswords(newPasswords)
            savePasswords(newPasswords, key, passwordsIv!)

            return true
        }

        const savePassword = (password: Password) => {
            const { id } = password
            const newPasswords = !passwords ? [password] : passwords.map(p => p.id === id ? password : p)
            setPasswords(newPasswords)
            savePasswords(newPasswords, key, passwordsIv!)
        }

        return (
            <Routes>
                <Route index element={<PasswordsPage
                    passwords={passwords}
                    deletePassword={deletePassword}
                />} />

                <Route path={ROUTE_PASSWORDS} element={<PasswordsPage
                    passwords={passwords}
                    deletePassword={deletePassword}
                />} />

                <Route path={ROUTE_NEW_PASSWORD} element={<NewPasswordPage
                    createPassword={createPassword}
                />} />

                <Route path={ROUTE_PASSWORD_BY_ID} element={<PasswordPage
                    passwords={passwords}
                    savePassword={savePassword}
                    deletePassword={deletePassword}
                />} />
            </Routes>
        )
    }

    return (
        <SetToastContext.Provider value={setToast}>
        <SetActionMenuContext.Provider value={setActionMenu}>
            {renderContent()}
            {toast ? <Toast data={toast} /> : null}
            {actionMenu ? <ActionMenu data={actionMenu} /> : null}
        </SetActionMenuContext.Provider>
        </SetToastContext.Provider>
    )
}
