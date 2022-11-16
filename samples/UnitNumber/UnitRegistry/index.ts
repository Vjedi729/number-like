import { Unit } from "../Units/unit";
import noneUnit from "./noneUnit";

export default class UnitRegistry {
    private static instance?: UnitRegistry = undefined

    public static GetInstance(){
        this.instance = this.instance || new UnitRegistry();
        return this.instance
    }
    
    private registry: {[key:string]: Unit}
    public defaultUnit: Unit;

    private constructor(){
        this.defaultUnit = noneUnit
        
        this.registry = {}
    }

    private helper_register(name: string, unit: Unit) {
        this.registry[name] = unit
    }

    public register(unit: Unit):void
    public register(name:string, unit: Unit):void
    public register(a: Unit | string, b?: Unit) {
        if (typeof(a) == 'string' && b) {
            this.helper_register(a, b)
        } else if (a instanceof Unit) {
            this.helper_register(a.name, a);
        } else {
            throw new TypeError("Unit Registry only accepts registering Units.")
        }
    }
    
    public tryGet(name: string): Unit | undefined {
        return this.registry[name]
    }

    public get(name: string, defaultUnit?: Unit): Unit {
        return this.tryGet(name) || defaultUnit || this.defaultUnit;
    }
}