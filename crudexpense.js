
function onClickExpense(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const myobj = {
        amount,
        description,
        category
    }
    //adding record to crudcrud
   axios.post('https://crudcrud.com/api/d1179656a12849948ef134a66484d6c5/expenseTrackerapp',myobj,{timeout:5000})
   .then(response =>
     {
         ShowOnDisplay(response.data);
         console.log(response)
     })
   .catch(err =>
     {
         document.body.innerHTML=document.body.innerHTML+'<h3>something went wrong</h3>'
         console.error(err)
     })
 
}
window.addEventListener('DOMContentLoaded', () => {
//getting all records from crudcrud
    axios.get('https://crudcrud.com/api/d1179656a12849948ef134a66484d6c5/expenseTrackerapp')
    .then(response=>
         {
        for (let i=0;i<response.data.length;i++){
            ShowOnDisplay(response.data[i]);
            console.log(response);
        }
        
    })
     .catch(err =>
        {console.error(err)
        })
  })
function ShowOnDisplay(user) {
    let parentNode = document.getElementById('Expenselist')
    let childHTML = `<li id=${user.amount}>${user.amount}-${user.description}-${user.category}
    <button onclick=deleteExpense('${user._id}')> Delete Expense</button>
    <button onclick=editExpense('${user.amount}','${user.description}','${user._id}')>Edit Expense </button>
    
    </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}
//updating records from crudcrud
function editExpense(amount,description,category,userId){
        
    document.getElementById('amount').value=amount;
    document.getElementById('description').value=description;
    document.getElementById('category').value=category;
    deleteExpense(userId);
    //editExpense(amount,description);
    
}

//deleting record from crudcrud
function deleteExpense(userId) {
    axios.delete(`https://crudcrud.com/api/d1179656a12849948ef134a66484d6c5/expenseTrackerapp/${userId}`)
        .then(response =>
            {
                    removeExpenseFromScreen(userId);
                    //console.log(response);
                })
            
  .catch(err =>console.error(err));
  }
   
function removeExpenseFromScreen(userId) {

    const parentNode = document.getElementById('Expenselist');
    const childNodeToBeDeleted = document.getElementById(userId)

    if (childNodeToBeDeleted) {

        parentNode.removeChild(childNodeToBeDeleted);
    }

}