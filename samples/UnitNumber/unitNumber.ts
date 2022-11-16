import { NumberLike } from "../../numberLike";
import siUnits from "./UnitRegistry/siUnits";
import Unit from "./Units/unit";
import CombinationUnit from "./Units/combinationUnit";
import UnitRegistry from "./UnitRegistry";

class UnitNumber implements NumberLike<UnitNumber> {
    readonly amount: number;
    readonly unit: Unit;

    constructor(amount: number, unit?: Unit | string) {
        this.amount = amount

        let unitRegistry = UnitRegistry.GetInstance()

        if (unit == undefined) {
            this.unit == unitRegistry.defaultUnit
        } else if (typeof(unit) == 'string') {
            let tryUnit = unitRegistry.tryGet(unit)
            if (tryUnit == undefined) { 
                throw new RangeError(`Could not find unit "${unit}".`) 
            } else {
                this.unit = tryUnit
            }
        } else if (unit instanceof Unit) {
            this.unit = unit
        } else {
            throw new TypeError("Unit must be a Unit object or a string (representing the unit name)")
        }

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