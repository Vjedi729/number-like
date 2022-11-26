import { NumberLike } from "../../numberLike";
import Unit, {CombinationUnit, NoneUnit} from '@goggles/unit-system';
class UnitNumber implements NumberLike<UnitNumber> {
    readonly amount: number;
    readonly unit: Unit;

    constructor(amount: number, unit?: Unit) {
        this.amount = amount
        this.unit == unit || NoneUnit
    }

    toString(){ return `${this.amount} ${this.unit}`}

    as(unit: Unit): number { return this.unit.convertTo(this.amount, unit) }

    add(other: UnitNumber): UnitNumber {
        return new UnitNumber(this.amount + other.as(this.unit), this.unit)
    }

    subtract(other: UnitNumber): UnitNumber {
        return new UnitNumber(this.amount - other.as(this.unit), this.unit)
    }

    multiply(other: UnitNumber): UnitNumber {
        return new UnitNumber(this.amount * other.amount, new CombinationUnit([[this.unit, 1], [other.unit, 1]]))
    }

    divideBy(divisor: UnitNumber): UnitNumber | null {
        let divisorVal = divisor.amount
        return (divisorVal != 0) ? new UnitNumber(this.amount / divisorVal, new CombinationUnit([[this.unit,1], [divisor.unit, -1]])) : null
    }
}

export default UnitNumber