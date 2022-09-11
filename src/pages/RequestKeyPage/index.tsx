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

    const importFromFile = () => {
        const input = document.createElement('input')

        input.type = 'file'

        input.addEventListener('change', () => {
            const file = input.files?.[0]
            if (!file) { return }

            if (!window.confirm('Warning: this will overwrite all current data.\nContinue?')) { return false }

            const reader = new FileReader

            reader.onerror = () => {
                setToast({ message: 'Error reading file' })
            }

            reader.onload = () => {
                try {
                    const kv = JSON.parse(String(reader.result))
                    if (typeof kv !== 'object') throw Error('not an object')
                    Object.entries(kv).forEach(([k, v]) => {
                        localStorage.setItem(k, String(v))
                    })
                    setToast({ message: 'Imported successfully' })
                } catch {
                    setToast({ message: 'Error parsing file' })
                }
            }

            reader.readAsText(file, 'UTF-8')
        })

        input.click()
    }

    const importText = () => {
        const text = window.prompt('Warning: this will overwrite all current data.\nPaste backup contents here:')

        try {
            const kv = JSON.parse(String(text || ''))
            if (typeof kv !== 'object') throw Error('not an object')
            Object.entries(kv).forEach(([k, v]) => {
                localStorage.setItem(k, String(v))
            })
            setToast({ message: 'Imported successfully' })
        } catch {
            setToast({ message: 'Error parsing text' })
        }
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
                    text: 'Export all',
                    onClick: exportAll,
                },
                {
                    text: 'Import file',
                    onClick: importFromFile,
                },
                {
                    text: 'Import text',
                    onClick: importText,
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
