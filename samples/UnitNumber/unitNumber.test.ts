import {describe, expect, test} from "@jest/globals"

import {UnitNumber} from "./unitNumber"

import {SIUnits} from '@goggles/unit-system-si-units'
import {USCSUnits} from '@goggles/unit-system-common-uscs-units'

describe("Testing UnitNumber", () => {
    test("Basic conversion test", () => {
        let x = new UnitNumber(1, SIUnits.meter);
        expect(x.as(USCSUnits.inch)).toBeCloseTo(39.3700787)
    })
})