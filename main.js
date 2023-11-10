const display = document.querySelector('.grid-input');//classı 'grid-input' olan öğeyi display değişkenine atar.
const keys = document.querySelector('.grid-keys');//classı 'grid-keys' olan öğeyi keys değişkenine atar.

let displayValue = '0';//displayValue değişkenine 0 değeri atanır.
let firstValue = null;//firstValue değişkenine null değeri atanır.
let operator = null;//operator değişkenine null değeri atanır.
let waiting = false;//waiting değişkenine false değeri atanır.

updateDisplay();//updateDisplay fonksiyonunu çağırır.

function updateDisplay() {//updateDisplay adında bir fonksiyon oluşturur.
    display.value = displayValue;//display değişkeninin valuesuna displayValue.
}

keys.addEventListener('click', function(e) {//keys e tıklandığında fonksiyonu çalıştırır.
    const element = e.target;//e.target olayın gerçekleştiği öğeyi temsil eder ve element değişkenine atanır.

    if (!element.matches('button')) return;//öğenin adının "button" olup olmadığına bakar.Eğer "button" değilse return işlevin geri kalanını çalıştırmaz.

    if (element.classList.contains('operator')) {// eğer "operator" isimli bir class varsa aşağıdaki kodları çalıştırır.
        handleOperator(element.value);//element nesnesinin value özelliğini handleOperator fonsiyonuna iletiyor.
        displayValue += ` ${element.value} `;//displayValue adlı bir değişkenin değerine, element.value değerini aralarına bir boşluk bırakarak ekler.
        updateDisplay();//updateDisplay fonksiyonunu çağırır.
        return;//işlevin geri kalanını çalıştırmaz.
    }

    if (element.classList.contains('decimal')) {// eğer "decimal" isimli bir class varsa aşağıdaki kodları çalıştırır.
        inputDecimal(element.value);//element nesnesinin value özelliğini inputDecimal fonsiyonuna iletiyor.
        updateDisplay();//updateDisplay fonksiyonunu çağırır.
        return;//işlevin geri kalanını çalıştırmaz.
    }

    if (element.classList.contains('clear')) {// eğer "clear" isimli bir class varsa aşağıdaki kodları çalıştırır.
        clear();//clear fonskisyonunu çağırır
        updateDisplay();//updateDisplay fonksiyonunu çağırır.
        return;//işlevin geri kalanını çalıştırmaz.
    }

    if (element.classList.contains('equal-sign')) {// eğer "equal-sign" isimli bir class varsa aşağıdaki kodları çalıştırır.
        calculateResult();//calculateResult fonksiyonunu çağırır.
        updateDisplay();//updateDisplay fonksiyonunu çağırır.
        return;//işlevin geri kalanını çalıştırmaz.
    }

    inputNumber(element.value);//inputNumber fonksiyonunu çağırır.
    updateDisplay();//calculateResult fonksiyonunu çağırır.
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
