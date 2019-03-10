let btn = document.getElementById ('start'),
    expenses = document.querySelectorAll('.expenses-item'),
    expensesBtn = document.getElementsByTagName ('button')[0],
    optionalBtn = document.getElementsByTagName ('button')[1],
    countBtn = document.getElementsByTagName ('button')[2],
    options = document.querySelectorAll ('.optionalexpenses-item'),
    extraMoney = document.querySelector('.choose-income'),
    sum = document.querySelector('.choose-sum'),
    percent = document.querySelector('.choose-percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value'),
    checkboxer = document.querySelector('#savings'),
    //values
    budget = document.getElementsByClassName('budget-value')[0], 
    dayvalue = document.getElementsByClassName('daybudget-value')[0], 
    levelvalue = document.getElementsByClassName('level-value')[0],
    expvalue = document.getElementsByClassName('expenses-value')[0],
    optvalue = document.getElementsByClassName('optionalexpenses-value')[0], 
    incvalue = document.getElementsByClassName('income-value')[0],
    monthvalue = document.getElementsByClassName('monthsavings-value')[0],
    yearvalue = document.getElementsByClassName('yearsavings-value')[0]; 

let money, time; 
    
btn.addEventListener('click', function (){
    time = prompt("Введите дату в формате YYYY-MM-DD?", "");
    money = +prompt("Ваш бюджет на месяц?", "");
    

    while(isNaN(money) || money == "" || money == null){
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budget.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth()+1;
    day.value = new Date(Date.parse(time)).getDate();
});


expensesBtn.disabled = true;

expenses.forEach(function(item, i, arr) {
        expenses[i].addEventListener('input', function() {
            if (expenses[i].value !== '') {
                expensesBtn.disabled = false;
                console.log('Active');
            }
        });
    });

    expensesBtn.addEventListener('click', function(){
            let sums = 0;
            for(let i=0; i<expenses.length; i++){
                let expensesForMouth = expenses[i].value, 
                    spending = expenses[++i].value;
            
                    if((typeof(expensesForMouth))=== 'string' && (typeof(expensesForMouth)) != null && (typeof(spending)) != null
                        && expensesForMouth !='' && spending !='' && expensesForMouth.length <50){
        
                            appData.expenses[expensesForMouth]=spending;
                            sums += +spending;
                    } else {
                        i=i-1;
                    }
            }
            expvalue.textContent =sums;
            appData.expensesSum = sums;
    });




optionalBtn.addEventListener('click', function(){
    for(let i=0; i<options.length; i++) {
        let extraExpenses = options[i].value;

        appData.optionalExpenses[i]=extraExpenses;
        optvalue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', function(){


    if(appData.budget != undefined) {
        
        appData.moneyForOneDay = ((appData.budget-appData.expensesSum)/30).toFixed(); 

        dayvalue.textContent = appData.moneyForOneDay;
        console.log(dayvalue);
    
        if(appData.moneyForOneDay<100){
            levelvalue.textContent = ("Минимальный уровень достатка");
        } else if(appData.moneyForOneDay>100 && appData.moneyForOneDay<2000){
            levelvalue.textContent = ("Средний уровень достатка");
        } else if(appData.moneyForOneDay>2000 ){
            levelvalue.textContent = ("Высокий уровень достатка");
        } else {
            levelvalue.textContent = (" Произошла ошибка")
        }
    } else {

        dayvalue.textContent =  'Произошла ошибка';
        }
});

extraMoney.addEventListener('input', function (){
    
    let items = extraMoney.value;
        if(items != +items){
            appData.income = items.split(', ');

            incvalue.textContent = appData.income;
        }else {
            incvalue.textContent = '';
        }
});

checkboxer.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sum.addEventListener('input', function(){
    if(appData.savings == true){
        let sume= +sum.value, 
        percente= +percent.value;
        appData.monthIncome =sume/100/12*percente;
        appData.yearIncome =sume/100*percente;

        monthvalue.textContent = appData.monthIncome.toFixed(1);
        yearvalue.textContent = appData.yearIncome.toFixed(1);
    }
});

percent.addEventListener('input', function(){
    if(appData.savings == true){
        let sume= +sum.value, 
        percente= +percent.value;
        appData.monthIncome =sume/100/12*percente;
        appData.yearIncome =sume/100*percente;

        monthvalue.textContent = appData.monthIncome.toFixed(1);
        yearvalue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money, 
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false, 
};

