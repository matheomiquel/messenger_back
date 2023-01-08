interface ObjectType {
  [key: string]: any
}

export type requestType<Body> = {
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