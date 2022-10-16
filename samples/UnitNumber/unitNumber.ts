import { NumberLike } from "../../numberLike";
import siUnits from "./Units/siUnits";
import Unit from "./Units/unit";
import CombinationUnit from "./Units/combinationUnit";

class UnitNumber implements NumberLike<UnitNumber> {
    amount: number;
    unit: Unit;

    constructor(amount: number, unit?: Unit | string){
        this.amount = amount
        this.unit = unit ? (typeof(unit) == 'string' ? siUnits[unit] : unit) : siUnits["None"]

        if (this.unit == undefined) { throw new RangeError(`Could not find unit "${unit}".`) }
    }

    toString(){ return `${this.amount} ${this.unit}`}

    as(unit: Unit){ return this.unit.convertTo(this.amount, unit) }

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