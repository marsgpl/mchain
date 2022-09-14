import { Icon } from 'components/Icon'
import {
    ERASE_CONFIRM,
    ERASE_OK,
    EXPORT_OK,
    IMPORT_CANCELLED,
    IMPORT_CONFIRM,
    IMPORT_FAILED,
    IMPORT_OK,
    IMPORT_OVERRIDE_WARNING,
    IMPORT_TEXT_PROMPT,
} from 'defs/messages'
import { useActionMenu } from 'hooks/useActionMenu'
import { useToast } from 'hooks/useToast'
import { erasePasswords, erasePasswordsIv, PASSWORDS_STORAGE_KEYS } from 'service/passwords'
import { exportAsJson, importFromJsonFile, importFromJsonText } from 'service/storage'
import s from './index.module.css'

export type ToolsMode = 'topleft'

export interface ToolsProps {
    mode: ToolsMode
}

function getModeClass(mode: ToolsMode): string {
    switch (mode) {
        case 'topleft': return s.ModeTopLeft
    }
}

export function Tools({
    mode,
}: ToolsProps) {
    const setActionMenu = useActionMenu()
    const setToast = useToast()

    const importFile = async () => {
        try {
            if (!window.confirm(`${IMPORT_OVERRIDE_WARNING}\n${IMPORT_CONFIRM}`)) {
                throw Error(IMPORT_CANCELLED)
            }

            await importFromJsonFile(PASSWORDS_STORAGE_KEYS)

            setToast({
                message: IMPORT_OK,
            })
        } catch (error) {
            console.error('🔺', error)

            setToast({
                message: IMPORT_FAILED,
            })
        }
    }

    const importText = () => {
        try {
            const text = window.prompt(`${IMPORT_OVERRIDE_WARNING}\n${IMPORT_TEXT_PROMPT}`)

            if (!text) {
                throw Error(IMPORT_CANCELLED)
            }

            importFromJsonText(text, PASSWORDS_STORAGE_KEYS)

            setToast({
                message: IMPORT_OK,
            })
        } catch (error) {
            console.error('🔺', error)

            setToast({
                message: IMPORT_FAILED,
            })
        }
    }

    const exportAll = () => {
        const host = window.location.host || 'unknown'
        const file = host + '.mchain.backup.json'

        exportAsJson(file, PASSWORDS_STORAGE_KEYS)

        setToast({
            message: EXPORT_OK,
        })
    }

    const eraseAll = () => {
        if (!window.confirm(ERASE_CONFIRM)) { return }

        erasePasswordsIv()
        erasePasswords()

        setToast({
            message: ERASE_OK,
        })
    }

    const show = () => {
        setActionMenu({
            buttons: [
                {
                    text: 'Export all',
                    onClick: exportAll,
                },
                {
                    text: 'Import file',
                    onClick: importFile,
                },
                {
                    text: 'Import text',
                    onClick: importText,
                },
                {
                    text: 'Erase all',
                    textColor: 'red',
                    onClick: eraseAll,
                },
            ],
        })
    }

    return (
        <div className={getModeClass(mode)} onClick={show}>
            <Icon id="more" />
        </div>
    )
}
