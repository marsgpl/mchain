import { Icon } from 'components/Icon'
import { cn } from 'lib/cn'
import { copy } from 'lib/copy'
import { Password } from 'model/Password'
import s from './index.module.css'

export interface PasswordListNodeProps {
    row: Password
}

export function PasswordListNode({ row }: PasswordListNodeProps) {
    const title = row.title || ''
    const username = row.username || ''
    const password = row.password || ''
    const starredPassword = '•'.repeat(password.length)

    const copyValue = (value: string, notificationText: string = 'Copied'): void => {
        copy(value).then(() => {
            alert(notificationText)
        })
    };

    return (
        <div className={s.Root}>
            <div className={cn(s.Row, s.RowBold)}>{title}</div>

            {username ? (
                <div
                    className={cn(s.Row, s.RowClickable)}
                    onClick={() => copyValue(username, 'Username copied')}
                >{username}</div>
            ) : null}

            {password ? (
                <div
                    className={cn(s.Row, s.RowClickable)}
                    onClick={() => copyValue(password, 'Password copied')}
                >{starredPassword}</div>
            ) : null}

            <div className={s.More}>
                <Icon id="more" />
            </div>
        </div>
    )
}
