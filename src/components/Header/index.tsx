import React from 'react'
import { Icon, IconId } from 'components/Icon'
import { InputText } from 'components/InputText'
import { Route } from 'defs/routes'
import { cn } from 'lib/cn'
import { useNavigate } from 'react-router-dom'
import s from './index.module.css'
import { KEY_ESCAPE } from 'defs/keys'

export const HEADER_ACTION_SEARCH = '^s'

export interface HeaderProps {
    title?: string
    leftIcon?: IconId
    rightIcon?: IconId
    leftAction?: React.MouseEventHandler | Route | typeof HEADER_ACTION_SEARCH
    rightAction?: React.MouseEventHandler | Route | typeof HEADER_ACTION_SEARCH
    onSearch?: React.Dispatch<React.SetStateAction<string>>
}

type Action = HeaderProps['leftAction'] | HeaderProps['rightAction']

export function Header({
    title,
    leftIcon,
    rightIcon,
    leftAction,
    rightAction,
    onSearch,
}: HeaderProps) {
    const navigate = useNavigate()

    const [searching, setSearching] = React.useState(false)

    const getAction = React.useCallback((action: Action) => {
        if (action === HEADER_ACTION_SEARCH) {
            return () => setSearching(true)
        }

        if (typeof action === 'string') {
            return () => navigate(action)
        }

        if (typeof action === 'function') {
            return action
        }
    }, [navigate])

    const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        onSearch?.(event.target.value)
    }

    const killSearch = () => {
        setSearching(false)
        onSearch?.('')
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.key === KEY_ESCAPE) {
            killSearch()
        }
    }

    const renderSearch = () => (
        <div className={s.Line}>
            <InputText
                leftIcon="search"
                rightIcon="close"
                rightAction={killSearch}
                inputAttrs={{
                    placeholder: 'Search',
                    type: 'text',
                    autoCorrect: 'off',
                    autoComplete: 'off',
                    spellCheck: false,
                    autoFocus: true,
                    onKeyDown,
                    onChange,
                }}
            />
        </div>
    )

    const renderLine = () => (
        <div className={s.Line}>
            <div
                className={cn(s.Icon, leftAction && s.IconClickable)}
                onClick={getAction(leftAction)}
            >
                {leftIcon ? <Icon id={leftIcon} /> : null}
            </div>

            <div className={s.LineTitle}>
                {title || ''}
            </div>

            <div
                className={cn(s.Icon, rightAction && s.IconClickable)}
                onClick={getAction(rightAction)}
            >
                {rightIcon ? <Icon id={rightIcon} /> : null}
            </div>
        </div>
    )

    return (
        <div className={s.Root}>
            {searching ? renderSearch() : renderLine()}
        </div>
    )
}
