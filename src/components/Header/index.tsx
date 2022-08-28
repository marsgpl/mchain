import React from 'react'
import { Icon } from 'components/Icon'
import { InputLine } from 'components/InputLine'

import s from './index.module.css'

export interface HeaderProps {
    title: string
}

interface SearchManipulation {
    setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

type DefaultProps = SearchManipulation & Pick<HeaderProps, 'title'>
type SearchProps = SearchManipulation

function renderDefault({ title, setIsSearchActive }: DefaultProps) {
    return (
        <div className={s.Line}>
            <div className={s.LineAction}>
                <Icon id="Menu" />
            </div>
            <div className={s.LineTitle}>
                {title}
            </div>
            <div className={s.LineAction} onClick={() => setIsSearchActive(true)}>
                <Icon id="Search" />
            </div>
        </div>
    )
}

function renderSearch({ setIsSearchActive }: SearchProps) {
    return (
        <div className={s.Line}>
            <InputLine
                leftIcon="Search"
                rightIcon="Close"
                onRightIconClick={() => setIsSearchActive(false)}
                inputHtmlProps={{
                    placeholder: 'Search',
                    type: 'text',
                    autoCorrect: 'off',
                    autoComplete: 'off',
                    spellCheck: false,
                    autoFocus: true,
                }}
            />
        </div>
    )
}

export function Header({ title }: HeaderProps) {
    const [isSearchActive, setIsSearchActive] = React.useState(false)

    return (
        <div className={s.Root}>
            {isSearchActive ? renderSearch({
                setIsSearchActive,
            }) : renderDefault({
                title,
                setIsSearchActive,
            })}
        </div>
    )
}
