import React from 'react'
import { Passwords } from 'model/Password'
import { useParams } from 'react-router-dom'
import s from './index.module.css'

export interface PasswordPageProps {
    passwords: Passwords
}

export function PasswordPage({ passwords }: PasswordPageProps) {
    const { id } = useParams()

    const password = React.useMemo(() => passwords.find(p => p.id === id), [id])

    if (!password) {
        throw Error('Password not found')
    }

    return (
        <div className={s.Root}>
            PasswordPage: id={id} data={JSON.stringify(password)}
        </div>
    )
}
