import React from 'react'
import { APP_TITLE } from 'defs/app'
import { Button } from 'components/Button'
import { InputText } from 'components/InputText'
import { Icon } from 'components/Icon'
import { useActionMenu } from 'hooks/useActionMenu'
import { erasePasswords, erasePasswordsIv } from 'service/passwords'
import { useToast } from 'hooks/useToast'
import s from './index.module.css'

export interface RequestKeyPageProps {
    onSubmit: (key: string) => void
}

export function RequestKeyPage({ onSubmit }: RequestKeyPageProps) {
    const [key, setKey] = React.useState('')
    const setActionMenu = useActionMenu()
    const setToast = useToast()

    const submit = () => onSubmit(key)

    const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setKey(event.target.value)
    }

    const importAll = () => {
        alert('Not implemented')
    }

    const exportAll = () => {
        const host = window.location.host || 'unknown'
        const mime = 'application/json'
        const charset = 'utf-8'
        const data = JSON.stringify(localStorage)
        const url = `data:${mime};charset=${charset},${encodeURIComponent(data)}`
        const a = document.createElement('a')
        a.href = url
        a.download = `${host}.mchain.backup.json`
        a.click()
    }

    const eraseAll = () => {
        erasePasswordsIv()
        erasePasswords()
        setToast({
            message: 'All data was erased',
        })
    }

    const eraseAllConfirm = () => {
        if (!window.confirm('Erase all data?')) { return false }
        eraseAll()
        return true
    }

    const more = () => {
        setActionMenu({
            buttons: [
                {
                    text: 'Import',
                    onClick: importAll,
                },
                {
                    text: 'Export all',
                    onClick: exportAll,
                },
                {
                    text: 'Erase all',
                    textColor: 'red',
                    onClick: eraseAllConfirm,
                },
            ],
        })
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

            <div className={s.More} onClick={more}>
                <Icon id="more" />
            </div>
        </div>
    )
}
