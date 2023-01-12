/* eslint-disable  @typescript-eslint/no-explicit-any */
export type requestType<Body> = {
    body: Body
    query: {
        [key: string]: any
    },
    params: {
        [key: string]: any
    },
    token :string | undefined
}
