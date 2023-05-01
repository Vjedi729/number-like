import { UnitNumber, MyNumber } from ".";

let x = new MyNumber(1)

class TestClass extends UnitNumber {
    extraValue: number
}

let y = new TestClass(1);

interface TestInterface extends UnitNumber {
    extraValue: number
}