function parseFile (scan) {
    const charsInAccountNumber = 81;
    const charsWithBlankLine = 108;
    const fileSize = scan.length;
    const totalAccounts = fileSize / charsWithBlankLine;
    let accountNumbers = [];
    for (let i = 0; i < totalAccounts; i++) {
        const startingPoint = i * charsWithBlankLine;
        const account = scan.slice(startingPoint, startingPoint + charsInAccountNumber);
        accountNumbers.push(parseAccountNumber(account));
    }
    return accountNumbers;
}

function parseAccountNumber (scan) {
    let accountNumber = "";
    const subStrSize = 3;
    const lines = 3;
    const lineLength = scan.length / lines;
    const totalDigits = lineLength /subStrSize;

    //First index is number second index is row
    const groups = [[], [], []];

    // Create 2D array of account number
    for (let i = 0; i < lines; i++) {
        for (let j = 0; j < totalDigits; j++) {
            const groupStart = lineLength * i + subStrSize * j;
            const group = scan.substring(groupStart, groupStart + subStrSize);
            groups[i].push(group);
        }
    }

    //Figure out each digit of account number
    for (let i = 0; i < totalDigits; i++) {
        let numberString = "";
        for (let j = 0; j < lines; j++) {
            numberString = numberString + groups[j][i];
        }
        for (let index = 0; index < possibleNumbers.length; index++) {
            if (numberString === possibleNumbers[index]) {
                accountNumber = accountNumber + index;
            }
        }
    }

    return Number(accountNumber);
};

const zero = " _ " +
             "| |" +
             "|_|" ;


const one = "   " +
            "  |" +
            "  |" ;

const two = " _ " +
            " _|" + 
            "|_ " ;

const three = " _ " +
              " _|" +
              " _|" ;

const four = "   " +
             "|_|" +
             "  |" ;

const five = " _ " +
             "|_ " +
             " _|" ;

const six = " _ " +
            "|_ " +
            "|_|" ;

const seven = " _ " +
              "  |" +
              "  |" ;

const eight = " _ " +
              "|_|" +
              "|_|" ;

const nine = " _ " +
             "|_|" +
             " _|" ;

const possibleNumbers = [zero, one, two, three, four, five, six, seven, eight, nine];

module.exports = parseFile;