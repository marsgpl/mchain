import { CHARSET_UTF8 } from 'defs/charset'
import { MIME_JSON } from 'defs/mimes'

export function exportAsJson(fileName: string) {
    const data = JSON.stringify(localStorage)
    const url = `data:${MIME_JSON};charset=${CHARSET_UTF8},${encodeURIComponent(data)}`

    const a = document.createElement('a')

    a.href = url
    a.download = fileName

    a.click()
}

export function importFromJsonFile(): Promise<true> {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')

        input.type = 'file'

        input.addEventListener('change', () => {
            const file = input.files?.[0]

            if (!file) {
                return reject('File was not selected')
            }

            const reader = new FileReader

            reader.onerror = (event) => {
                console.error('🔺', event)
                reject('Failed to read file')
            }

            reader.onload = () => {
                try {
                    importFromJsonText(String(reader.result))
                    resolve(true)
                } catch (error) {
                    reject(error)
                }
            }

            reader.readAsText(file, CHARSET_UTF8)
        })

        input.click()
    })
}

export function importFromJsonText(text: string) {
    const kv = JSON.parse(text)

    if (typeof kv !== 'object') {
        throw Error('Invalid format')
    }

    Object.entries(kv).forEach(([k, v]) => {
        localStorage.setItem(k, String(v))
    })
}
