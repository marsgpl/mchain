export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    return keys.reduce((kv, k) => {
        kv[k] = obj[k]
        return kv
    }, {} as Pick<T, K>)
}
