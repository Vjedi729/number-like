/*
Name 	        Symbol  Quantity 	                                                    Equivalents 	        SI base unit Equivalents
hertz 	        Hz 	    frequency 	                                                    1/s                     s−1
radian 	        rad     angle 	                                                        m/m 	                1
steradian 	    sr 	    solid angle 	                                                m2/m2 	                1
newton 	        N 	    force, weight 	                                                kg m/s2 	            kg m s**−2
pascal 	        Pa 	    pressure, stress 	                                            N/m2                    kg m−1 s−2
joule 	        J 	    energy, work, heat 	                                            m N, C V, W s 	        kg m2 s−2
watt 	        W 	    power, radiant flux 	                                        J/s, V A                kg m2 s−3
coulomb 	    C 	    electric charge or quantity of electricity 	                    s A, F V 	            s A
volt 	        V 	    voltage, electrical potential difference, electromotive force 	W/A, J/C 	            kg m2 s−3 A−1
farad 	        F 	    electrical capacitance 	                                        C/V, s/Ω 	            kg−1 m−2 s4 A2
ohm 	        Ω 	    electrical resistance, impedance, reactance 	                1/S, V/A 	            kg m2 s−3 A−2
siemens 	    S 	    electrical conductance 	                                        1/Ω, A/V 	            kg−1 m−2 s3 A2
weber 	        Wb 	    magnetic flux 	                                                J/A, T m2,V s 	        kg m2 s−2 A−1
tesla 	        T 	    magnetic induction, magnetic flux density 	                    V s/m2, Wb/m2, N/(A m) 	kg s−2 A−1
henry 	        H 	    electrical inductance 	                                        V s/A, Ω s, Wb/A 	    kg m2 s−2 A−2
degree Celsius 	°C 	    temperature relative to 273.15 K 	                            K 	                    K
lumen 	        lm 	    luminous flux 	                                                cd sr 	                cd
lux 	        lx 	    illuminance 	                                                lm/m2 	                cd m−2
becquerel 	    Bq 	    radioactivity (decays per unit time) 	                        1/s 	                s−1
gray 	        Gy 	    absorbed dose (of ionizing radiation) 	                        J/kg 	                m2 s−2
sievert 	    Sv 	    equivalent dose (of ionizing radiation) 	                    J/kg 	                m2 s−2
katal 	        kat     catalytic activity 	                                            mol/s 	                s−1 mol. 
*/

import Unit from "../../Units/unit"
import CombinationUnit from "../../Units/combinationUnit"
import siBasisUnits from './siBasisUnits'

let units = siBasisUnits.reduce<{[key:string]: Unit}>((map, curr) => {map[curr.name] = curr; return map}, {})
let u = siBasisUnits.reduce<{[key:string]: Unit}>((map, curr) => {map[curr.abbreviation || curr.name] = curr; return map}, {})

let siDerivedUnits = [
    new CombinationUnit([[u.s, -1]                                   ], "hertz",            "Hz"    ),
    new CombinationUnit([                                            ], "radian", 	        "rad"   ),
    new CombinationUnit([                                            ], "steradian", 	    "sr"    ),
    new CombinationUnit([[u.kg,  1], [u.m,  1], [u.s, -2]            ], "newton", 	        "N"     ),
    new CombinationUnit([[u.kg,  1], [u.m, -1], [u.s, -2]            ], "pascal", 	        "Pa"    ),
    new CombinationUnit([[u.kg,  1], [u.m,  2], [u.s, -2],           ], "joule", 	        "J"     ),
    new CombinationUnit([[u.kg,  1], [u.m,  2], [u.s, -3]            ], "watt", 	        "W"     ),
    new CombinationUnit([[u.s,   1], [u.A,  1],                      ], "coulomb", 	        "C"     ),
    new CombinationUnit([[u.kg,  1], [u.m,  2], [u.s, -3], [u.A, -1] ], "volt", 	        "V"     ),
    new CombinationUnit([[u.kg, -1], [u.m, -2], [u.s,  4], [u.A,  2] ], "farad", 	        "F"     ),
    new CombinationUnit([[u.kg,  1], [u.m,  2], [u.s, -3], [u.A, -2] ], "ohm", 	            "Ω"     ),
    new CombinationUnit([[u.kg, -1], [u.m, -2], [u.s,  3], [u.A,  2] ], "siemens", 	        "S"     ),
    new CombinationUnit([[u.kg,  1], [u.m,  2], [u.s, -2], [u.A, -1] ], "weber", 	        "Wb"    ),
    new CombinationUnit([[u.kg,  1], [u.s, -2], [u.A, -1]            ], "tesla", 	        "T"     ),
    new CombinationUnit([[u.kg,  1], [u.m,  2], [u.s, -2], [u.A, -2] ], "henry", 	        "H"     ),
    new CombinationUnit([[u.K,   1],                                 ], "degree Celsius",	"°C"    ),
    new CombinationUnit([[u.cd,  1],                                 ], "lumen", 	        "lm"    ),
    new CombinationUnit([[u.cd,  1], [u.m, -2],                      ], "lux", 	            "lx"    ),
    new CombinationUnit([[u.s,  -1],                                 ], "becquerel", 	    "Bq"    ),
    new CombinationUnit([[u.m,   2], [u.s, -2],                      ], "gray", 	        "Gy"    ),
    new CombinationUnit([[u.m,   2], [u.s, -2],                      ], "sievert", 	        "Sv"    ),
    new CombinationUnit([[u.s,  -1], [u.mol,1],                      ], "katal", 	        "kat"   ),
]

export default siDerivedUnits