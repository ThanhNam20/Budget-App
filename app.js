//Budget Controller

var budgetController = (function () {
    // code here
})();


// UI controller 
var UIController = (function () {

})();

//Global App Controller 
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = () => {
        // 1. Get the filed input data 
        // 2. Add the item to the budget
        // 3. Add the item to UI
        // 4. Calculate the budget
        // 5. Displau the budget on the UI
    }

    document.querySelector('.add__btn').addEventListener("click", ctrlAddItem());

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
})(budgetController, UIController);