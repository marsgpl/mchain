import React from 'react'
import { Header } from 'components/Header'
import { RequestKey } from 'components/RequestKey'

export function App() {
    const [key, setKey] = React.useState<string | undefined>(undefined)
    const [error, setError] = React.useState<string | undefined>(undefined)

    React.useEffect(() => {
        if (!key) { return }

        const invalidKey = key !== 'sdfngdsnog325235'

        if (invalidKey) {
            setError('Invalid key')
        } else {
            setError(undefined)
        }
    }, [key])

    if (error) {
        return <b>Error: {error}</b>
    }

    if (!key) {
        return <RequestKey onSubmit={setKey} />
    }

    return <Header title="MChain" />
}
