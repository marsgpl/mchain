import { useNavigate } from 'react-router-dom'
import { Header } from 'components/Header'
import { PasswordForm } from 'components/PasswordForm'
import { ROUTE_PASSWORDS } from 'defs/routes'
import { Password } from 'model/Password'
import s from './index.module.css'

export interface NewPasswordPageProps {
    onCreate: (password: Password) => void
}

export function NewPasswordPage({ onCreate }: NewPasswordPageProps) {
    const navigate = useNavigate()

    return (
        <div className={s.Root}>
            <Header
                title="New password"
                leftIcon="left"
                leftAction={ROUTE_PASSWORDS}
            />

            <PasswordForm
                className={s.Form}
                onSubmit={password => {
                    onCreate(password)
                    navigate(ROUTE_PASSWORDS)
                }}
            />
        </div>
    )
}
