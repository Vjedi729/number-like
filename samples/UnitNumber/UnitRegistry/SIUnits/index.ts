import Unit, { SimpleUnit } from "../../Units/unit"
import siBasisUnits from './siBasisUnits'
import siDerivedUnits from './siDerivedUnits'

let siBaseUnits = siBasisUnits.concat(siDerivedUnits)

let siUnits: {[key: string]: Unit} = {}


// Time
siUnits['minute'] = new SimpleUnit('minute', siUnits.second.shape, 1/60, 'min')
siUnits['hour'] = new SimpleUnit('hour', siUnits.second.shape, 1/(60*60), 'hr')

export default siUnits