import * as equal from "fast-deep-equal";
import { Mock, IMock, It, Times } from "moq.ts";

export default class Is<T> extends It<T> {
    public static Eq<T>(expected: T): T {
        const predicate = (actual:any) => equal(expected, actual);
        return new It<T>(predicate) as any;
    }
}