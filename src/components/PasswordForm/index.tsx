import React from 'react'
import { Button } from 'components/Button'
import { cn } from 'lib/cn'
import { Password } from 'model/Password'
import s from './index.module.css'
import { newPassword } from 'service/passwords'
import { InputText } from 'components/InputText'
import { KEY_ENTER } from 'defs/keys'

export interface PasswordFormProps {
    className?: string
    onSubmit: (password: Password) => void
}

export function PasswordForm({
    className,
    onSubmit,
}: PasswordFormProps) {
    const [password, setPassword] = React.useState(newPassword())

    const submit = () => {
        onSubmit(password)
    }

    const titleOnChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setPassword({
            ...password,
            title: event.target.value,
        })
    }

    const usernameOnChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setPassword({
            ...password,
            username: event.target.value,
        })
    }

    const passwordOnChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setPassword({
            ...password,
            password: event.target.value,
        })
    }

    return (
        <form
            className={cn(s.Root, className)}
            onSubmit={submit}
        >
            <InputText
                className={s.Row}
                inputAttrs={{
                    placeholder: 'Title',
                    type: 'text',
                    autoCorrect: 'on',
                    autoComplete: 'on',
                    spellCheck: true,
                    autoFocus: true,
                    required: true,
                    onChange: titleOnChange,
                }}
            />

            <InputText
                className={s.Row}
                inputAttrs={{
                    placeholder: 'Username',
                    type: 'text',
                    autoCorrect: 'off',
                    autoComplete: 'off',
                    spellCheck: false,
                    autoFocus: false,
                    required: false,
                    onChange: usernameOnChange,
                }}
                rightIcon="copy"
            />

            <InputText
                className={s.Row}
                inputAttrs={{
                    placeholder: 'Password',
                    type: 'text',
                    autoCorrect: 'off',
                    autoComplete: 'off',
                    spellCheck: false,
                    autoFocus: false,
                    required: false,
                    onChange: passwordOnChange,
                }}
                rightIcon2="wand"
                rightIcon="copy"
            />

            <Button
                className={s.Submit}
                text="Create"
                type="submit"
                wide
            />
        </form>
    )
}
