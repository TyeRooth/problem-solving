let requireText = require('require-text');
let input = requireText('./input_file.txt', require);

let puzzle;
let words;
let puzzleHeight;
let puzzleWidth;

function parseInput () {
    const parsedLines = input.split(/\r?\n/);
    // Find space between puzzle and words
    puzzleHeight = parsedLines.indexOf('');
    puzzle = parsePuzzle(parsedLines, puzzleHeight);
    puzzleWidth = puzzle[0].length;
    words = parseWords(parsedLines, puzzleHeight);
}

function parsePuzzle(input, height) {
    let puzzle = [];
    for (let i = 0; i < height; i++) {
        puzzle.push(input[i].split("  "));
    }
    return puzzle;
}

function parseWords(input, height) {
    let words = [];
    const start = height + 1;
    for (let i = start; i < input.length; i++) {
        words.push(input[i]);
    }
    return words;
}

function searchWords () {
    let wordCoords = [];
    for (let i = 0; i < words.length; i++) {
        wordCoords.push(findWord(puzzle, words[i]));
    }
    return wordCoords;
}

function findWord(puzzle, word) {
    let wordCoord;
    const firstLetter = word.charAt(0);
    for (let i = 0; i < puzzleHeight; i++) {
        // Find all first letter matches in a row.
        let indices = [];
        let index = puzzle[i].indexOf(firstLetter);
        while(index !== -1) {
            indices.push(index);
            index = puzzle[i].indexOf(firstLetter, index + 1);
        }
        indices.forEach(first => {
            const possibleArrays = getArrays(word.length, puzzle, i, first);
            possibleArrays.forEach(array => {
                if (checkMatch(array, word)) {
                    wordCoord = `${ word } (${ first }, ${ i })`;
                }
            })
        });
    }
    return wordCoord;    
}

function checkMatch (array, word) {
    const string = array.join("");
    return (string === word);
}

function generateArray (length, puzzle, yDif, xDif, firstRow, firstColumn) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(puzzle[firstRow + yDif * i][firstColumn + xDif * i]);
    }
    return array;
}

function getArrays (length, puzzle, row, column) {
    //Adjust length so that it can work with 2D array which starts with zero
    const adjLength = length - 1;
    let possibleArrays = [];

    //Starting top and moving CW
    if (row - adjLength >= 0) {
        const array = generateArray(length, puzzle, -1, 0, row, column);
        possibleArrays.push(array);
    }
    if (row - adjLength >= 0 && column + adjLength < puzzleWidth) {
        const array = generateArray(length, puzzle, -1, 1, row, column);
        possibleArrays.push(array);
    }
    if (column + adjLength < puzzleWidth) {
        const array = generateArray(length, puzzle, 0, 1, row, column);
        possibleArrays.push(array);
    }
    if (column + adjLength < puzzleWidth && row + adjLength < puzzleHeight) {
        const array = generateArray(length, puzzle, 1, 1, row, column);
        possibleArrays.push(array);
    }
    if (row + adjLength < puzzleHeight) {
        const array = generateArray(length, puzzle, 1, 0, row, column);
        possibleArrays.push(array);
    }
    if (row + adjLength < puzzleHeight && column - adjLength >= 0) {
        const array = generateArray(length, puzzle, 1, -1, row, column);
        possibleArrays.push(array);
    }
    if (column - adjLength >= 0) {
        const array = generateArray(length, puzzle, 0, -1, row, column);
        possibleArrays.push(array);
    }
    if (column - adjLength >=0 && row - adjLength >= 0) {
        const array = generateArray(length, puzzle, -1, -1, row, column);
        possibleArrays.push(array);
    }
    return possibleArrays;
}

parseInput();
searchWords();