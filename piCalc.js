const realPi = 3.1415;
let calcRepeats = 1;
let startDate;



console.log('select your confidence interval');


const confIntervals = [0.10, 0.05, 0.01, 0.001];
const alphabet = ['a', 'b', 'c', 'd'];
for(let i=0; i<confIntervals.length; i++) {
    console.log('>> (' + alphabet[i] +') ' + confIntervals[i]);
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question('Which interval would you like to select (id letter) or put in your own (comma seperated): ', interval => {
    if(interval >= 1) {
        throw new Error('you a funny guy');
    }
    
    if(typeof +interval === 'number' && (interval.includes('.') || interval.includes(','))) {
        interval = interval.replace(/,/g, '.').replace(/[^\d.-]/g, '');        // replace non numeric and dot or floats
        repeatedCalc(+interval);
        startDate = new Date();
    } else {
        repeatedCalc(+confIntervals[alphabet.indexOf(interval)]);
        startDate = new Date();
}
    readline.close();
});


function calcComplete() {
    console.log('time elapsed: ' + new Date() - startDate);
    console.log('\nrepeats needed: ' + calcRepeats);
    console.log('calculated number: ' + calculatedPi + ' with confidence interval ' + confIntervalVal*100 + '%');
    return;
}



function repeatedCalc() {
    const calculatedPi = calcPi(calcRepeats);

    if(calculatedPi < (realPi * (1+upperLimit)) && calculatedPi > (realPi * (1-lowerLimit))) {
        calcComplete()
    } else {
        console.log(calcRepeats + ' repeat were not enough');
        calcRepeats = calcRepeats*10;
        repeatedCalc();
    }


    function calcPi(calcRepeats = 1) {
        let innerPointsTotal = 0;
        let totalPoints = 0;
        
        for(let i=0; i<calcRepeats; i++) {
            const x = Math.random();
            const y = Math.random();
            const distance = x**2 + y**2;
        
            if(distance < 1) { innerPointsTotal++; }
            totalPoints++;
        }
    
        return Math.round((innerPointsTotal / totalPoints * 4 * 10000)) / 10000;
    }

}