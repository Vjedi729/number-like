import { assert } from "console"
import UnitShape, { UnitBasisType, UnitShapeMap } from "./unitShape"

export abstract class Unit {
    name: string
    abbreviation?: string
    shape: UnitShape

    constructor(name: string, shape: UnitBasisType | UnitShapeMap | UnitShape, abbreviation?: string){
        this.name = name
        this.abbreviation = abbreviation
        this.shape = shape instanceof UnitShape ? shape : new UnitShape(shape)
    }

    protected test(valuesToTest: Array<number>, maxPercentError: number = 0.01){
        valuesToTest.forEach(x => {assert(this.roundTripError(x) < maxPercentError*x)})
    } 
    
    roundTripError(valueToTest: number){
        let y = this.toBaseSI(this.fromBaseSI(valueToTest))
        return Math.abs(y - valueToTest)
    }

    abstract toBaseSI(quantityInThisUnit: number): number
    abstract fromBaseSI(quantityInBaseSI: number): number

    convertTo(amountInThisUnit:number, toUnit:Unit): number {
        if (this.shape.equal(toUnit.shape)) {
            return toUnit.fromBaseSI(this.toBaseSI(amountInThisUnit))
        } else {
            throw TypeError(`Unit types do not match: ${this.shape} != ${toUnit.shape}`)
        }
    }

    toString(){ return this.abbreviation ? this.abbreviation : this.name }
}

export class BaseSIUnit extends Unit {
    toBaseSI(quantityInThisUnit: number): number { return quantityInThisUnit }
    fromBaseSI(quantityInBaseSI: number): number { return quantityInBaseSI }
}

export class SimpleUnit extends Unit {
    scaleToBaseSI: number
    oneOverScale: number

    constructor(name:string, shape: UnitBasisType | UnitShapeMap | UnitShape, scaleToBaseSI: number, abbreviation?: string) 
    {
        super(name, shape, abbreviation)
        this.scaleToBaseSI = scaleToBaseSI
        this.oneOverScale = 1/scaleToBaseSI
    }

    toBaseSI(x: number) { return this.scaleToBaseSI * x }
    fromBaseSI(x: number) { return this.oneOverScale * x}
}

export default Unit