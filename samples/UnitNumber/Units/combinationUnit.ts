import { Unit } from "./unit";
import UnitShape, { UnitShapeMap } from "./unitShape";

type UnitPowers = Array<[Unit, number]>

function createName(unitPowers: UnitPowers): string {
    return unitPowers.map(([unit, power]) => `${unit.name}^${power}`).join(" * ") // TODO: Remove exponent when power == 1
}

function createShape(unitPowers: UnitPowers): UnitShape {
    return unitPowers.reduce<UnitShape>(
        (prev:UnitShape, [unit, power]) => prev.add(unit.shape.multiply(power)),
        new UnitShape({})
    )
}

function createAbbreviation(unitPowers: UnitPowers): string | undefined {
    if (unitPowers.every(([unit,]) => unit.abbreviation != undefined)){
        return unitPowers.map(([unit, power]) => `${unit.abbreviation}^${power}`).join(" ") // TODO: Remove exponent when power == 1
    }
    return undefined
}

export default class CombinationUnit extends Unit {
    unitPowers: UnitPowers

    private static FlattenUnitPowers(unitPowers: UnitPowers) : UnitPowers {
        return unitPowers.reduce<UnitPowers>((list, curr) => {
            return list.concat((curr[0] instanceof CombinationUnit) ? CombinationUnit.FlattenUnitPowers(curr[0].unitPowers) : [curr])
        }, [])
    }

    private static SimplifyUnitPowers(unitPowers: UnitPowers): UnitPowers {
        let flatUnitPowers = CombinationUnit.FlattenUnitPowers(unitPowers)

        let units:{[key:string]: [Unit, number]} = {}
        flatUnitPowers.forEach(([unit, power]) => {
            let [, prevPower] = units[unit.name]
            units[unit.name] = [unit, (prevPower || 0) + power]
        })

        return Object.entries(units).map(([, entry]) => entry)
    }

    constructor(unitPowers: UnitPowers, name?: string, abbreviation?: string){
        unitPowers = CombinationUnit.SimplifyUnitPowers(unitPowers)
        
        super(name || createName(unitPowers), createShape(unitPowers), abbreviation || createAbbreviation(unitPowers))
        this.unitPowers = unitPowers  
    }

    toBaseSI(quantityInThisUnit: number): number {
        return this.unitPowers.reduce<number>((result, [unit, power]) => {
            for(let i=0; i<power; i++){ result = unit.toBaseSI(result) }
            for(let i=0; i>-power; i--){ result = unit.fromBaseSI(result) }
            return result
        }, quantityInThisUnit)
    }

    fromBaseSI(quantityInBaseSI: number): number {
        return this.unitPowers.reduce<number>((result, [unit, power]) => {
            for(let i=0; i<power; i++){ result = unit.fromBaseSI(result) }
            for(let i=0; i>-power; i--){ result = unit.toBaseSI(result) }
            return result
        }, quantityInBaseSI)
    }    

}