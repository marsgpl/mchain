import React from 'react'
import { Button, ButtonProps } from 'components/Button'
import { cn } from 'lib/cn'
import { Password } from 'model/Password'
import { newPassword } from 'service/passwords'
import { InputText } from 'components/InputText'
import { randomString } from 'lib/randomString'
import { RANDOM_PASSWORD_ALPHABET, RANDOM_PASSWORD_MAX_LEN, RANDOM_PASSWORD_MIN_LEN } from 'defs/password'
import { capitalize } from 'lib/capitalize'
import { useFocus } from 'hooks/useFocus'
import { KEY_ENTER } from 'defs/keys'
import { useCopyValue } from 'hooks/useCopyValue'
import s from './index.module.css'

export interface PasswordFormProps {
    initial?: Password
    className?: string
    submitProps?: ButtonProps
    onSubmit: (password: Password) => void
    extraContent?: JSX.Element
}

export function PasswordForm({
    initial,
    className,
    onSubmit,
    submitProps,
    extraContent,
}: PasswordFormProps) {
    const [current, setCurrent] = React.useState(initial || newPassword())
    const [usernameRef, focusUsername] = useFocus()
    const [passwordRef, focusPassword] = useFocus()
    const copyValue = useCopyValue()

    const generatePassword = () => {
        setCurrent({
            ...current,
            password: randomString(
                RANDOM_PASSWORD_ALPHABET,
                RANDOM_PASSWORD_MIN_LEN,
                RANDOM_PASSWORD_MAX_LEN,
            ),
        })
    }

    const submit = () => {
        onSubmit(current)
    }

    const titleOnChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setCurrent({
            ...current,
            title: capitalize(event.target.value),
        })
    }

    const usernameOnChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setCurrent({
            ...current,
            username: event.target.value,
        })
    }

    const passwordOnChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setCurrent({
            ...current,
            password: event.target.value,
        })
    }

    const titleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.key === KEY_ENTER) {
            event.preventDefault()
            focusUsername()
        }
    }

    const usernameOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.key === KEY_ENTER) {
            event.preventDefault()
            focusPassword()
        }
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
                    onKeyDown: titleOnKeyDown,
                    value: current.title,
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
                    onKeyDown: usernameOnKeyDown,
                    value: current.username,
                }}
                inputRef={usernameRef}
                rightIcon="copy"
                rightAction={() => copyValue(current.username || '', 'Username copied')}
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
                    value: current.password,
                }}
                inputRef={passwordRef}
                rightIcon2="wand"
                rightIcon="copy"
                rightAction2={generatePassword}
                rightAction={() => copyValue(current.password || '', 'Password copied')}
            />

            <Button
                text="Submit"
                wide
                {...submitProps}
                className={cn(s.Submit, submitProps?.className)}
                type="submit"
            />

            {extraContent}
        </form>
    )
}
