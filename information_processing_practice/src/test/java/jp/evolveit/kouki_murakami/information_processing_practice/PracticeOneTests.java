package jp.evolveit.kouki_murakami.information_processing_practice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PracticeOneTests {
    @Test
    void test() {
        FixedPointNumber test = new FixedPointNumber();
        test.decimalToBinaryConversion(2.34);
    }
}
