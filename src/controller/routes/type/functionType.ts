import { requestType } from "./requestType";
import { responseType } from "./responseType";
export type functionType =
    (req: requestType<object | undefined>) => responseType<number, object | undefined>
