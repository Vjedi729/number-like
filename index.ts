import { NumberLike } from "./numberLike";
import MyNumber from "./samples/myNumber.ts";

export function AsNumberLike(x: number): MyNumber;
export function AsNumberLike<T extends NumberLike<T>>(x: NumberLike<T>) : NumberLike<T>;
export function AsNumberLike<T extends NumberLike<T>>(x: number | NumberLike<T>) : NumberLike<T> | MyNumber {
    return typeof(x)=='number' ? new MyNumber(x) : x
}