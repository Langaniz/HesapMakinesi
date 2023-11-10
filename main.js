const display = document.querySelector('.grid-input');
const keys = document.querySelector('.grid-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waiting = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', function(e) {
    const element = e.target;

    if (!element.matches('button')) return;

    if (element.classList.contains('operator')) {
        handleOperator(element.value);
        displayValue += ` ${element.value} `;
        updateDisplay();
        return;
    }

    if (element.classList.contains('decimal')) {
        inputDecimal(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains('clear')) {
        clear();
        updateDisplay();
        return;
    }

    if (element.classList.contains('equal-sign')) {
        calculateResult();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
 });

function handleOperator(nextOperator) {//handleOperator isimli nextOperator parametreli bir fonksiyon oluşturur.
    if (waiting) {//eger waiting true ise nextOperator operatore atanır.
        operator = nextOperator;
    } else {
        if (operator && firstValue !== null) {//operator ve firstValue doluysa calculateResult fonksiyonu çağrılır.
            calculateResult();
        }
        firstValue = parseFloat(displayValue);//displayValueyu değerini sayı olarak güncelleyip firstValueya atar.
        operator = nextOperator;
        waiting = true;//waiting true yapılır çünkü bir operator seçildi ve bir sonraki sayı bekleniyor.
    }
}

function inputNumber(num) {//inputNumber adında num parametreli bir fonksiyon oluşturur.
    if (waiting) {//waiting true ise displayValue num(yeni sayı) ile güncellenir ve waiting false yapılır.
        displayValue = num;//num değeri displayValue değişkenine atanır.
        waiting = false;//waiting değişkenine false değeri atanır.
    } else {//waiting false ise displayValue "0" ise displayValue "0" değeri atanır aksi takdirde mevcut değerin sonuna "num" eklenir.
        displayValue = displayValue === '0' ? num : displayValue + num;
    } 
}

function inputDecimal() {//inputDecimal adında bir fonksiyon oluşturur.
    if (!displayValue.includes('.')) {//displayValue içinde ondalık "." bulunmuyorsa displayValuenin sonuna bir nokta eklenir.
        displayValue += '.';
    }
}

function clear() {//clear adında bir fonksiyon oluşturur.
    displayValue = '0';//displayValue değişkenine 0 değeri atanır.
    operator = null;//operator değişkenine null değeri atanır.
    firstValue = null;//firstValue değişkenine null değeri atanır.
    waiting = false;//waiting değişkenine false değeri atanır.
}

function calculateResult() {//calculateResult adında bir fonksiyon oluşturur.
    if (operator && firstValue !== null) {//eğer operator ve firstValue null değilse.
        const secondValue = parseFloat(displayValue);//displayValue içerisindeki değeri ondalık bir sayıya dönüştürerek bu değeri secondValue değişkenine atar.
        switch (operator) {
            case '+':
                displayValue = (firstValue + secondValue).toString();//'firstValue' ve 'secondValue' toplanır elde edilen sayı, "toString" metodunu kullanarak bir diziye dönüştürülür.
                break;
            case '-':
                displayValue = (firstValue - secondValue).toString();//'firstValue' ve 'secondValue' çıkartılıp elde edilen sayı, "toString" metodunu kullanarak bir diziye dönüştürülür.
                break;
            case '*':
                displayValue = (firstValue * secondValue).toString();//'firstValue' ve 'secondValue' çarpılıp elde edilen sayı, "toString" metodunu kullanarak bir diziye dönüştürülür.
                break;
            case '/':
                if (secondValue === 0) {//secondValue 0 a eşit ise displayValueya "Error" atar.
                    displayValue = 'Error';
                } else {
                    displayValue = (firstValue / secondValue).toString();//'firstValue' ve 'secondValue' bölünüp elde edilen sayı, "toString" metodunu kullanarak bir diziye dönüştürülür.
                }
                break;
        }
        operator = null;//operator değişkenine null değeri atanır.
        firstValue = null;//firstValue değişkenine null değeri atanır.
        waiting = false;//waiting değişkenine false değeri atanır.
    }
}

display.addEventListener('focus', function() {//display focus olduğunda valuesunu boşluk yapar.
    display.value = ''; 
});
