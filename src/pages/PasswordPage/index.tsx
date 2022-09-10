import React from 'react'
import { Password, Passwords } from 'model/Password'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from 'components/Header'
import { ROUTE_PASSWORDS } from 'defs/routes'
import { PasswordForm } from 'components/PasswordForm'
import { Button } from 'components/Button'
import s from './index.module.css'

export interface PasswordPageProps {
    passwords: Passwords
    savePassword: (password: Password) => void
    deletePassword: (passwordId: string) => boolean
}

export function PasswordPage({
    passwords,
    savePassword,
    deletePassword,
}: PasswordPageProps) {
    const navigate = useNavigate()
    const { id } = useParams()

    const password = React.useMemo(() =>
        passwords.find(p => p.id === id),
    [passwords, id])

    if (!password) {
        throw Error('Password not found')
    }

    return (
        <div className={s.Root}>
            <Header
                title="Password"
                leftIcon="left"
                leftAction={ROUTE_PASSWORDS}
            />

            <PasswordForm
                initial={password}
                className={s.Form}
                onSubmit={password => {
                    savePassword(password)
                    navigate(ROUTE_PASSWORDS)
                }}
                submitProps={{
                    text: 'Save',
                }}
                extraContent={<Button
                    className={s.Delete}
                    type="button"
                    text="Delete"
                    bg="trans"
                    onClick={() => {
                        deletePassword(password.id) && navigate(ROUTE_PASSWORDS)
                    }}
                    wide
                />}
            />
        </div>
    )
}
