import { PasswordListNode } from 'components/PasswordListNode'
import { Password } from 'model/Password'
import s from './index.module.css'

export interface PasswordListProps {
    rowsN: number
    rowGetter: (index: number) => Password
}

export function PasswordList({ rowsN, rowGetter }: PasswordListProps) {
    return (
        <div className={s.Root}>
            {Array.from(Array(rowsN), (_, index) =>
                <PasswordListNode key={index} row={rowGetter(index)} />
            )}
        </div>
    )
}
