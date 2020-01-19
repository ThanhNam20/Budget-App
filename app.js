//Budget Controller

var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            // Create new id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item base on type (inc or exp)
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }
            // Push it into our data structure
            data.allItems[type].push(newItem);

            //return new element
            return newItem;
        },
        test: function () {
            console.log(data);
        }
    };
})();

// UI controller
var UIController = (function () {
    //Store the input class
    var DOMstrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      inputBtn: ".add__btn",
      incomeContainer: ".income__list",
      expensesContainer: ".expenses__list"
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either cong or tru;
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        addListItem: function (obj, type) {
            // Create HTML string with palceholder text
            var html, newHtml, element;
            if (type === "inc") {
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="income-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            } else if (type === "exp") {
                element = DOMstrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            }
            //Replace the placeholder text withsome actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", obj.value);
            // Insert the HTML into the DOM
            document
              .querySelector(element)
              .insertAdjacentHTML("beforeend", newHtml);
        },
        clearFields: function () {
            var fields, fieldArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            fieldArr = Array.prototype.slice.call(fields)
            
            fieldArr.forEach((current) => {
                current.value = "";
            })
            fieldArr[0].focus();
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();

//Global App Controller
var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", event => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = () => {
        var input, newItem;
        // 1. Get the filed input data
        input = UICtrl.getInput();
        // 2. Add the item to the budget
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to UI
        UICtrl.addListItem(newItem, input.type);
        //3.1 Clear the field
        UICtrl.clearFields();
        // 4. Calculate the budget
        // 5. Displau the budget on the UI
    };
    return {
        init: function () {
            setupEventListeners();
        }
    };
})(budgetController, UIController);

controller.init();