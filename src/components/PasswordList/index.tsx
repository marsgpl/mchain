import { PasswordListNode } from 'components/PasswordListNode'
import { Password } from 'model/Password'
import s from './index.module.css'

export interface PasswordListProps {
    rowsN: number
    rowGetter: (index: number) => Password
    deletePassword: (passwordId: string) => boolean
}

export function PasswordList({ rowsN, rowGetter, deletePassword }: PasswordListProps) {
    return (
        <div className={s.Root}>
            {Array.from(Array(rowsN), (_, index) =>
                <PasswordListNode
                    key={index}
                    row={rowGetter(index)}
                    deletePassword={deletePassword}
                />
            )}
        </div>
    )
}
