import { Button } from 'components/Button'
import { DEFAULT_ERROR_MESSAGE } from 'defs/errors'
import s from './index.module.css'

export interface ErrorPageProps {
    message?: string
    refreshable?: boolean
}

function refresh() {
    window.location.reload()
}

export function ErrorPage({ message, refreshable }: ErrorPageProps) {
    return (
        <div className={s.Root}>
            {message || DEFAULT_ERROR_MESSAGE}

            {refreshable ? (
                <Button
                    text="Refresh"
                    onClick={refresh}
                    className={s.Button}
                />
            ) : null}
        </div>
    )
}
