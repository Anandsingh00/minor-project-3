document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmoutInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses'))  ||[] ;
    renderExpenses();
    updateTotal();
   

    expenseForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmoutInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount > 0){

            const newExpense = {
                id : Date.now() ,
                name : name ,
                amount : amount 
            }

            expenses.push(newExpense);
            saveExpensesTolocal();
            renderExpenses()
            updateTotal();

            // clear the inputs
            expenseNameInput.value = ""
            expenseAmoutInput.value = ""

        }

    });

    function renderExpenses(){
        expenseList.innerHTML = "";
        expenses.forEach((expense)=>{
            const li = document.createElement("li");
            li.innerHTML =`
            ${expense.name} - ₹${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        })

    }

    function calculateTotal(){
        return expenses.reduce((sum,expense)=> sum+expense.amount , 0); // array.reduce() method
    }

    function saveExpensesTolocal(){
        localStorage.setItem("expenses",JSON.stringify(expenses));
    }

    function updateTotal(){
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const expenseId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== expenseId)

            saveExpensesTolocal();
            renderExpenses();
            updateTotal();
        }
    })
});