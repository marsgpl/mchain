export const ROUTE_ALL = '*'
export const ROUTE_INDEX = '/'
export const ROUTE_NEW_PASSWORD = '/password/new' // safe since ids are longer
export const ROUTE_PASSWORD_BY_ID = '/password/:id'
export const ROUTE_PASSWORDS = '/passwords'

export type Route =
    | typeof ROUTE_ALL
    | typeof ROUTE_INDEX
    | typeof ROUTE_NEW_PASSWORD
    | typeof ROUTE_PASSWORD_BY_ID
    | typeof ROUTE_PASSWORDS
