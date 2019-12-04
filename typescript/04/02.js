
let count = 0;

for (let i1 = 0; i1 < 10; i1 += 1) {
    for (let i2 = i1; i2 < 10; i2 += 1) {
        for (let i3 = i2; i3 < 10; i3 += 1) {
            for (let i4 = i3; i4 < 10; i4 += 1) {
                for (let i5 = i4; i5 < 10; i5 += 1) {
                    for (let i6 = i5; i6 < 10; i6 += 1) {
                        const input = [i1, i2, i3, i4, i5, i6];
                        const num = Number(`${i1}${i2}${i3}${i4}${i5}${i6}`);

                        if (num < 108457) {
                            i1 = 1;
                            continue;
                        }
                        if (num > 562041) {
                            break;
                        }

                        if (hasDoubleDigits(input)) {
                            count += 1;
                        }
                    }
                }
            }
        }
    }
}

function hasDoubleDigits(input) {
    let blackListedDigits = [];
    let lastDigit = null;
    for (let i = 0; i < input.length; i += 1) {
        const digit = input[i];

        if (digit === lastDigit) {
            if (digit === input[i + 1]) {
                blackListedDigits.push(digit);
            }

            if (!blackListedDigits.includes(digit)) {
                return true;
            }
        }

        lastDigit = digit;
    }

    return false;
}

console.log(count);