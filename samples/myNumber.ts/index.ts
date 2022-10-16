import { NumberLike, NumberLikeClass } from "../../numberLike"

class MyNumber implements NumberLike<MyNumber> {
    val: number
    
    constructor(val: number | MyNumber){
        this.val = val instanceof MyNumber ? val.val : val
    }

    valueOf() { return this.val}
    toString() { return `${this.val}`}

    add(other: MyNumber): MyNumber {
        return new MyNumber(this.val + other.val)
    }
    subtract(other: MyNumber): MyNumber {
        return new MyNumber(this.val - other.val)
    }
    multiply(other: MyNumber): MyNumber {
        return new MyNumber(this.val * other.val)
    }
    divideBy(divisor: MyNumber): MyNumber | null {
        return divisor.val==0 ? null : new MyNumber(this.val / divisor.val)
    }
}

export default MyNumber