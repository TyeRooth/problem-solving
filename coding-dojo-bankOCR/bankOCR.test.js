const parseFile = require('./bankOCR');

it('program can parse single account number from single entry', () => {
    const scan = 
        "    _  _     _  _  _  _  _ " +
        "  | _| _||_||_ |_   ||_||_|" +
        "  ||_  _|  | _||_|  ||_| _|" +
        "                           " ;
    
    expect(parseFile(scan)[0]).toBe(123456789);
});

it('program can parse multiple account numbers', () => {
    const scan = 
        "       _     _     _     _ " +
        "  |  || |  || |  || |  || |" +
        "  |  ||_|  ||_|  ||_|  ||_|" +
        "                           " +
        " _                         " +
        "  ||_||_||_||_||_||_||_||_|" +
        "  |  |  |  |  |  |  |  |  |" +
        "                           " ;

    //expect(parseFile(scan)[0]).toBe(110101010);
    expect(parseFile(scan)[1]).toBe(744444444);
});