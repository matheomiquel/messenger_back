export type requestType = {
    body: {
        [key: string]: any
    },
    query: {
        [key: string]: any
    },
    params: {
        [key: string]: any
    },
    token :string | undefined
}