import { NumberLike } from "./numberLike";

export interface VectorLike<SelfType extends VectorLike<SelfType>>{

    add(other: SelfType): SelfType
    multiply(scalar: number): SelfType
}