//Budget Controller

var budgetController = (function () {
    // code here
})();


// UI controller 
var UIController = (function () {

    //Store the input class
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either cong or tru;
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }

        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();

//Global App Controller 
var controller = (function (budgetCtrl, UICtrl) {
    var DOM = UICtrl.getDOMstrings();
    var ctrlAddItem = () => {
        // 1. Get the filed input data 
        var input = UICtrl.getInput();
        console.log(input);
        // 2. Add the item to the budget
        // 3. Add the item to UI
        // 4. Calculate the budget
        // 5. Displau the budget on the UI
    }

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem());

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
})(budgetController, UIController);