let allClearBtn = document.getElementById('clear');
let formulaScreen = document.querySelector('.formula');
let outputScreen = document.querySelector('.output');

let trueorfalse;
//Parse
let theNumber;

//Stores the numbers entered 
let numberArr = [];

allClearBtn.addEventListener('click', ()=>{
 formulaScreen.innerHTML = '';
 outputScreen.innerHTML = '0';
 numberArr = []; //clear the array

});

let numberBtns = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal'];




//Number Buttons
numberBtns.forEach((element, index) =>{
    document.getElementById(element).addEventListener('click', ()=>{
        let [... containsDot] = outputScreen.innerHTML;
        //If there is an equals symbol and they haven't pressed the other buttons
        let [... containsEquals] = formulaScreen.innerHTML
        //After pressing the equals button followed by a + - / * there will be a symbol  
        if(outputScreen.innerHTML[0] === '+' || outputScreen.innerHTML[0] === '-' || outputScreen.innerHTML[0] === '*' || outputScreen.innerHTML[0] === '/'){
            //Clear it out 
            outputScreen.innerHTML = '';
        }

        if(containsEquals.includes('=')){
            formulaScreen.innerHTML = '';
            outputScreen.innerHTML = '';
        }
        //No Decimal point
        if(!containsDot.includes('.')){
            if(outputScreen.innerHTML[0] === '0' && index !== 10){
                if(index === 0){
                    outputScreen.innerHTML = ''
                    outputScreen.innerHTML += 0;
                    formulaScreen.innerHTML = '';
                }
                else{
                    outputScreen.innerHTML = '';
                    outputScreen.innerHTML += index;
                    formulaScreen.innerHTML += index;
                }
                
            }
            //If it is any button 0 to 9
            else if(index != 10){
                console.log(`Button pressed: ${index}`);
                outputScreen.innerHTML += index;
                formulaScreen.innerHTML += index;
            }
            else{
                //leading number is 0
                if(outputScreen.innerHTML[0] === '0'){
                    outputScreen.innerHTML += '.'
                    formulaScreen.innerHTML += '0';
                    formulaScreen.innerHTML += '.'
                }
                else{
                    if(outputScreen.innerHTML.length === 0){
                        //straight after equals
                        outputScreen.innerHTML += '0.'
                        formulaScreen.innerHTML += '0.'
                    }
                    else{
                        outputScreen.innerHTML += '.'
                        formulaScreen.innerHTML += '.'
                    }
                    
                }
                
            }
        }
        else{
            if(index != 10){
                outputScreen.innerHTML += index;
                formulaScreen.innerHTML += index;
            }
        }
    });
});


//Button Elements
let addBtn = document.getElementById('add');
let subtractBtn = document.getElementById('subtract');
let multiplyBtn = document.getElementById('multiply'); 
let divideBtn = document.getElementById('divide');
let equalsBtn = document.getElementById('equals');

addBtn.addEventListener('click', () =>{
    let len = formulaScreen.innerHTML.length;
    let [... containsEquals] = formulaScreen.innerHTML;
    if(len > 0){
        if(containsEquals.includes('=')){
            let index = containsEquals.indexOf('=');
            continueSum(index, '+', len);
        }
        //If the last symbol on screen is 
        else if((formulaScreen.innerHTML[len-2] === '+' && formulaScreen.innerHTML[len -1] === '-') || (formulaScreen.innerHTML[len-2] === '*' && formulaScreen.innerHTML[len -1] === '-')){      
                alterSymbol(len, '+', 2);
                //edge case where it was a *- then a + 
                trueorfalse = false;
        }
        else if(formulaScreen.innerHTML[len -1] === '-' || formulaScreen.innerHTML[len -1] === '/' || formulaScreen.innerHTML[len -1] === '*'){
                //get rid off the any symbol
                alterSymbol(len, '+', 1);
        }
        else if(formulaScreen.innerHTML[len -1] !== '+'){
                //Is the previous symbol 
                theNumber = parseFloat(outputScreen.innerHTML);
                numberArr.push(theNumber);
                numberArr.push('+');
                outputScreen.innerHTML = '0';
                formulaScreen.innerHTML += '+';
        }
    } 
});



subtractBtn.addEventListener('click', ()=>{
    let len = formulaScreen.innerHTML.length;
    if(formulaScreen.innerHTML[len -1] === '+'){
        // Possible Edge case but may need removing 
        //theNumber = parseFloat(outputScreen.innerHTML);
        //numberArr.push(theNumber);
        //numberArr.pop(); //clears the + 
        numberArr.pop(); //clears the zero
        numberArr.push('-');
        outputScreen.innerHTML = '0';
        formulaScreen.innerHTML += '-';
    }
    else if(formulaScreen.innerHTML[len -1] === '*'){
        formulaScreen.innerHTML += '-';
        outputScreen.innerHTML += '-';
        trueorfalse = true;
    }
    else if(formulaScreen.innerHTML[len -1] === '/'){
        //get rid off the any symbol
        alterSymbol(len, '-', 1);
    }
    else if(formulaScreen.innerHTML[len -1] !== '-' && len > 0){
        theNumber = parseFloat(outputScreen.innerHTML);
        numberArr.push(theNumber);
        numberArr.push('-');
        outputScreen.innerHTML = '0';
        formulaScreen.innerHTML += '-';
    }   
});

divideBtn.addEventListener('click', ()=>{
    let len = formulaScreen.innerHTML.length;
    if(formulaScreen.innerHTML[len-2] === '+' && formulaScreen.innerHTML[len -1] === '-'){
        alterSymbol(len, '/', 2);
    }
    else if(formulaScreen.innerHTML[len -1] === '*' || formulaScreen.innerHTML[len -1] === '+' || formulaScreen.innerHTML[len -1] === '-'){
        alterSymbol(len, '/', 1);
    }
    else if(formulaScreen.innerHTML[len -1] !== '/' && len > 0){
        theNumber = parseFloat(outputScreen.innerHTML);
        numberArr.push(theNumber);
        numberArr.push('/');
        outputScreen.innerHTML = '0';
        formulaScreen.innerHTML += '/';
    }
    
});

multiplyBtn.addEventListener('click', ()=>{
    let len = formulaScreen.innerHTML.length;
    if(formulaScreen.innerHTML[len-2] === '+' && formulaScreen.innerHTML[len -1] === '-'){
        alterSymbol(len, '*', 2);
    }
    else if(formulaScreen.innerHTML[len -1] === '/' || formulaScreen.innerHTML[len -1] === '+' || formulaScreen.innerHTML[len -1] === '-'){
        alterSymbol(len, '*', 1);
    }
    else if(formulaScreen.innerHTML[len -1] !== '*' && len > 0){
        theNumber = parseFloat(outputScreen.innerHTML);
        numberArr.push(theNumber);
        numberArr.push('*');
        outputScreen.innerHTML = '0';
        formulaScreen.innerHTML += '*';
    }
});

equalsBtn.addEventListener('click', ()=>{
    // NEGATIVE NUMBER edge case negative number
    if(trueorfalse){
        numberArr.push(parseFloat(`-${outputScreen.innerHTML}`));
        trueorfalse = false;
    }
    else{
        numberArr.push(parseFloat(outputScreen.innerHTML));
    }

   let len = numberArr.length;
   
   if(numberArr[2] === 0){
        let removeSymbol = formulaScreen.innerHTML.slice(0, len-2); //Cut the old one off
        formulaScreen.innerHTML = `${removeSymbol} = ${removeSymbol}`;

    }
    else if(len > 2){
        formulaScreen.innerHTML += `=${calculation()}`;
        outputScreen.innerHTML = calculation();
    }
    else{
        formulaScreen.innerHTML = `${formulaScreen.innerHTML} = ${formulaScreen.innerHTML}`;
    } 
    numberArr = [];
    //Reset the array 
});

//Functions
function continueSum(index, symbol, len){
    
    let removeSymbol = formulaScreen.innerHTML.slice(index +1, len);
    formulaScreen.innerHTML = removeSymbol;
    theNumber = parseFloat(removeSymbol);
    numberArr.push(theNumber);
    numberArr.push(symbol);
    formulaScreen.innerHTML += symbol;
    outputScreen.innerHTML = symbol;
}

function alterSymbol(len, symbol, num){
    let removeSymbol = formulaScreen.innerHTML.slice(0, len-num); //Cut the old symbol(s)
    formulaScreen.innerHTML = `${removeSymbol}${symbol}`; //change the screen
    numberArr.pop();
    numberArr.push(symbol);   
}

function calculation(){
    //If it is only a number and a symbol
    if(numberArr.length < 2){
        return `${numberArr[0]}`;
    }
    else{
        let rollingArray = numberArr;   
        let calcArray = [''];
        for(let i = 0; i < rollingArray.length; i++){
         
            calcArray += rollingArray[i];
        }
     //perform the calculation 
     return eval(calcArray);
    }
}

//Old Function 

// function calculation(){
//     let rollingTotal = 0;
//     if(numberArr.length < 2){
//         return `${numberArr[0]}`;
//     }
//     else{
//         for(let i = 1; i < numberArr.length; i+= 2){
//             if(i === 1){
//                  if(numberArr[1] === '+'){
//                      rollingTotal = numberArr[0] + numberArr[2];
//                  }
//                  else if(numberArr[1] === '*'){
//                      rollingTotal = numberArr[0] * numberArr[2]; 
//                  }
//                  else if(numberArr[1] === '/'){
//                     rollingTotal = numberArr[0] / numberArr[2];
//                  }
//                  else if(numberArr[1] === '-'){
//                     rollingTotal = numberArr[0] - numberArr[2];
//                  }
//                  else{
//                    
//                      rollingTotal = -100;
//                  }

//             }
//             else{
//                 if(numberArr[i] === '+'){
//                     rollingTotal += numberArr[i + 1];
//                 }
//                 else{
//                     rollingTotal -= numberArr[i + 1];
//                 }
//             }
//         }
//         return rollingTotal; 
//     }
// }
