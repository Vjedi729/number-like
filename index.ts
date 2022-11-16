import { NumberLike as NumberLikeType } from "./numberLike";
import MyNumber from "./samples/myNumber";
// import UnitNumber from './samples/UnitNumber/unitNumber'

function AsNumberLike(x: number): MyNumber;
function AsNumberLike<T extends NumberLikeType<T>>(x: NumberLikeType<T>) : NumberLikeType<T>;
function AsNumberLike<T extends NumberLikeType<T>>(x: number | NumberLikeType<T>) : NumberLikeType<T> | MyNumber {
    return typeof(x)=='number' ? new MyNumber(x) : x
}

export default AsNumberLike;
export * from "./samples"
export * as Samples from './samples'