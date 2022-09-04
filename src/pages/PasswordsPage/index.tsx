import React from 'react'
import { Header, HEADER_ACTION_SEARCH } from 'components/Header'
import { PasswordList } from 'components/PasswordList'
import { ROUTE_NEW_PASSWORD } from 'defs/routes'
import { Passwords } from 'model/Password'
import { passwordToSearchChunk, searchQueryToChunks } from 'service/passwords'
import s from './index.module.css'

export interface PasswordsPageProps {
    passwords: Passwords
}

export function PasswordsPage({ passwords }: PasswordsPageProps) {
    const [searchQuery, setSearchQuery] = React.useState('')

    const searchInChunks = React.useMemo(() =>
        passwords.map(passwordToSearchChunk),
    [passwords])

    const filtered = React.useMemo<Passwords>(() => {
        const searchForChunks = searchQueryToChunks(searchQuery)

        if (!searchForChunks.length) {
            return passwords
        }

        return searchInChunks.reduce<Passwords>((acc, searchIn, index) => {
            for (let i = 0; i < searchForChunks.length; ++i) {
                const searchFor = searchForChunks[i]

                if (searchIn.includes(searchFor)) {
                    acc.push(passwords[index])
                    break
                }
            }

            return acc
        }, [])
    }, [
        searchQuery,
        searchInChunks,
        passwords,
    ])

    const hasPasswords = passwords.length > 0
    const hasMatches = filtered.length > 0

    return (
        <div className={s.Root}>
            <Header
                title="Passwords"
                leftIcon="search"
                leftAction={HEADER_ACTION_SEARCH}
                rightAction={ROUTE_NEW_PASSWORD}
                rightIcon="plus"
                onSearch={setSearchQuery}
            />

            {hasMatches ? (
                <PasswordList
                    rowsN={filtered.length}
                    rowGetter={index => filtered[index]}
                />
            ) : (
                <div className={s.Empty}>
                    {hasPasswords ? 'No match' : 'No passwords yet'}
                </div>
            )}
        </div>
    )
}
