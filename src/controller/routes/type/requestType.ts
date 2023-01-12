interface ObjectType {
  [key: string]: any
}

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