export type responseType<statusCode, Obj> = Promise<
  { status: statusCode; data: statusCode extends 204 ? undefined : Obj }
>;
