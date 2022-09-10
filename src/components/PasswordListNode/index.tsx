import { Icon } from 'components/Icon'
import { cn } from 'lib/cn'
import { Password } from 'model/Password'
import { useCopyValue } from 'hooks/useCopyValue'
import { useActionMenu } from 'hooks/useActionMenu'
import s from './index.module.css'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PASSWORD_BY_ID } from 'defs/routes'

export interface PasswordListNodeProps {
    row: Password
    deletePassword: (passwordId: string) => boolean
}

export function PasswordListNode({ row, deletePassword }: PasswordListNodeProps) {
    const setActionMenu = useActionMenu()
    const copyValue = useCopyValue()
    const navigate = useNavigate()

    const { username, password } = row
    const passwordMask = '•'.repeat(password?.length || 0)

    const more = () => {
        setActionMenu({
            buttons: [
                {
                    text: 'Edit',
                    onClick: () => navigate(ROUTE_PASSWORD_BY_ID.replace(':id', row.id))
                },
                {
                    text: 'Delete',
                    textColor: 'red',
                    bg: 'white',
                    onClick: () => deletePassword(row.id),
                },
            ],
        })
    }

    return (
        <div className={s.Root}>
            <div className={cn(s.Row, s.RowBold)}>{row.title}</div>

            {username ? (
                <div
                    className={cn(s.Row, s.RowClickable)}
                    onClick={() => copyValue(username, 'Username copied')}
                >{username}</div>
            ) : null}

            {password ? (
                <div
                    className={cn(s.Row, s.RowClickable, s.RowMasked)}
                    onClick={() => copyValue(password, 'Password copied')}
                >{passwordMask}</div>
            ) : null}

            <div className={s.More} onClick={more}>
                <Icon id="more" />
            </div>
        </div>
    )
}
