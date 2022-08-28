import { cn } from 'lib/cn'

import s from './index.module.css'

export type IconId =
    | 'Menu'
    | 'Search'
    | 'Close'
    | 'Lock'
    | 'Left'
    | 'Right'

export interface IconProps {
    id: IconId
}

export function Icon({ id }: IconProps) {
    return (
        <div className={cn(s.Root, s[id])}></div>
    )
}
