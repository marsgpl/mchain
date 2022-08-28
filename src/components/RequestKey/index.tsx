import React from 'react'
import { InputLine } from 'components/InputLine'

import s from './index.module.css'

export interface RequestKeyProps {
    onSubmit: (key: string) => void
}

export function RequestKey({ onSubmit }: RequestKeyProps) {
    const [key, setKey] = React.useState('')

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmit(key)
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value)
    }

    return (
        <div className={s.Root}>
            <InputLine
                className={s.InputRow}
                leftIcon="Lock"
                rightIcon="Right"
                onRightIconClick={() => onSubmit(key)}
                inputHtmlProps={{
                    placeholder: 'Key',
                    type: 'password',
                    autoCorrect: 'off',
                    autoComplete: 'off',
                    spellCheck: false,
                    autoFocus: true,
                    onKeyDown,
                    onChange,
                    className: s.Input,
                }}
            />
        </div>
    )
}
