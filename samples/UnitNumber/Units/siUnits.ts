import UnitShape from "./unitShape"
import Unit, { BaseSIUnit, SimpleUnit } from "./unit"

const SI_BASIS_UNITS = [
    {name:'meter',      abbreviation:'m',   shape: new UnitShape("Length")},
    {name:'second',     abbreviation:'s',   shape: new UnitShape("Time")},
    {name:'kelvin',     abbreviation:'K',   shape: new UnitShape("Temperature")},
    {name:'kilogram',   abbreviation:'kg',  shape: new UnitShape("Mass")},
    {name:'ampere',     abbreviation:'A',   shape: new UnitShape("ElectricCurrent")},
    {name:'candela',    abbreviation:'cd',  shape: new UnitShape("LuminousIntensity")},
]

const SI_PREFIXES = [
    {name: 'yotta',	abbreviation: 'Y',	exp: 24},
    {name: 'zetta',	abbreviation: 'Z',	exp: 21},
    {name: 'exa',	abbreviation: 'E',	exp: 18},
    {name: 'peta',	abbreviation: 'P',	exp: 15},
    {name: 'tera',	abbreviation: 'T',	exp: 12},
    {name: 'giga',	abbreviation: 'G',	exp: 9},
    {name: 'mega',	abbreviation: 'M',	exp: 6},
    {name: 'kilo',	abbreviation: 'k',	exp: 3},
    {name: 'hecto',	abbreviation: 'h',	exp: 2},
    {name: 'deka',	abbreviation: 'da',	exp: 1},
    
    {name: '',	    abbreviation: '',	exp: 0},

    {name: "deci",  abbreviation: "d",	exp: -1},
    {name: "centi", abbreviation: "c",	exp: -2},
    {name: "milli", abbreviation: "m",	exp: -3},
    {name: "micro", abbreviation: "μ",	exp: -6},
    {name: "nano",  abbreviation: "n",	exp: -9},
    {name: "pico",  abbreviation: "p",	exp: -12},
    {name: "femto", abbreviation: "f",	exp: -15},
    {name: "atto",  abbreviation: "a",	exp: -18},
    {name: "zepto", abbreviation: "z",	exp: -21},
    {name: "yocto", abbreviation: "y",	exp: -24},
]

let siUnits: {[key: string]: Unit} = {}
siUnits["None"] = new BaseSIUnit("None",  new UnitShape({}), '')

SI_BASIS_UNITS.forEach((baseUnit) => {
    siUnits[baseUnit.name] = new BaseSIUnit(baseUnit.name, baseUnit.shape, baseUnit.abbreviation)
})
SI_PREFIXES.forEach((prefix) => {
    // meters
    if(prefix.name != ''){
        let name = `${prefix.name}meter`
        let scaleVal = 10**-prefix.exp
        siUnits[name] = new SimpleUnit(name, siUnits.meter.shape, scaleVal, `${prefix.abbreviation}m`)
    }

    // grams
    if(prefix.name != 'kilo'){
        let name = `${prefix.name}gram`
        let scaleVal = 10**(-3-prefix.exp)
        siUnits[name] = new SimpleUnit(name, siUnits.kilogram.shape, scaleVal, `${prefix.abbreviation}g`)
    }
})

// Time
siUnits['minute'] = new SimpleUnit('minute', siUnits.second.shape, 1/60, 'min')
siUnits['hour'] = new SimpleUnit('hour', siUnits.second.shape, 1/(60*60), 'hr')

export default siUnits