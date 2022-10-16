export interface NumberLikeClass<ObjectType extends NumberLike<ObjectType>>
{
    new(value: number): ObjectType
} // Is this needed?

export interface NumberLike<SelfType extends NumberLike<SelfType>>
{
    add(other: SelfType): SelfType
    subtract(other: SelfType): SelfType
    multiply(other: SelfType): SelfType
    divideBy(divisor: SelfType): SelfType | null
}