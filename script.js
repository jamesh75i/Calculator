let allClearBtn = document.getElementById('all-clear');

let formulaScreen = document.getElementById('formula');
let outputScreen = document.getElementById('output');

let outputNumber;
let formulaNumber;

allClearBtn.addEventListener('click', ()=>{
 formulaScreen.innerHTML = '';
 outputScreen.innerHTML = 0

});

let numberBtns = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];



numberBtns.forEach((element, index) =>{
   
    document.getElementById(element).addEventListener('click', ()=>{
        if(outputScreen.innerHTML[0] === '0'){
            console.log('first number is zero');
            outputScreen.innerHTML = ''
            outputScreen.innerHTML += index;
        }
        else{
            outputScreen.innerHTML += index;
        }
        
    
    });
});





let operandArray = ['add', 'subtract', 'multiply', 'divide', 'equals'];


let decimalBtn = document.getElementById('decimal').addEventListener('click',  ()=>{
    let number = 0;
    for(let i = 0; i < outputScreen.innerHTML.length; i++){
        if(outputScreen.innerHTML[i] === '.'){
            console.log("Full Stop Found!");
            number++;
        }    
    }
    console.log()
});


operandArray.forEach((element) =>{
    document.getElementById(element).addEventListener('click', ()=>{
        let len = outputScreen.innerHTML.length;
        
        switch(element){
            case 'add':
                if(outputScreen.innerHTML[len -1] === '+'){
                    console.log('+ is already there');
                }
                else{
                    outputScreen.innerHTML += '+';
                }
                
                break;
            case 'subtract':
                console.log('-');
                break;
            case 'multiply':
                console.log('*');
                break;
            case 'divide':
                console.log('/');
                break;
            case 'equals':
                console.log('=');
                break;
            default:
                console.log('Error');
                break;
        }
    });    
});




