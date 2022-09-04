import React from 'react'
import { APP_TITLE } from 'defs/app'
import { Button } from 'components/Button'
import { KEY_ENTER } from 'defs/keys'
import { InputText } from 'components/InputText'
import s from './index.module.css'
import { Icon } from 'components/Icon'

export interface RequestKeyPageProps {
    onSubmit: (key: string) => void
}

export function RequestKeyPage({ onSubmit }: RequestKeyPageProps) {
    const [key, setKey] = React.useState('')

    const submit = () => onSubmit(key)

    const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setKey(event.target.value)
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.key === KEY_ENTER) {
            submit()
        }
    }

    return (
        <div className={s.Root}>
            <Icon className={s.Logo} id="logo" />

            <div className={s.Title}>
                {APP_TITLE}
            </div>

            <form
                className={s.Form}
                onSubmit={submit}
            >
                <InputText
                    leftIcon="lock"
                    inputAttrs={{
                        placeholder: 'Key',
                        type: 'password',
                        autoCorrect: 'off',
                        autoComplete: 'off',
                        spellCheck: false,
                        autoFocus: true,
                        required: true,
                        onKeyDown,
                        onChange,
                    }}
                />

                <Button
                    className={s.Submit}
                    type="submit"
                    text="Submit"
                    wide
                />
            </form>

            <div className={s.Pad} />
        </div>
    )
}
