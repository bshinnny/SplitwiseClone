

const GET_ALL_EXPENSES = "expenses/GET_ALL_EXPENSES";
const GET_ONE_EXPENSE = "expenses/GET_ONE_EXPENSE";
const EDIT_ONE_EXPENSE = "expenses/EDIT_ONE_EXPENSE";
const CREATE_EXPENSE = "expenses/CREATE_ONE_EXPENSE";
const DELETE_EXPENSE = "expenses/DELETE_ONE_EXPENSE";
const CREATE_GROUP_EXPENSE = "expenses/CREATE_GROUP_EXPENSE";


//action creators
const loadAllExpenses = (allExpenses) => ({
    type: GET_ALL_EXPENSES,
    allExpenses
})

const loadOneExpense = (oneExpense) => ({
    type: GET_ONE_EXPENSE,
    oneExpense
})

const editExpense = (edited) => ({
    type: EDIT_ONE_EXPENSE,
    edited
})

const postExpense = (newCharge) => ({
    type: CREATE_EXPENSE,
    newCharge
})

const postGroupExpense = (newGroupCharge) => ({
    type: CREATE_GROUP_EXPENSE,
    newGroupCharge
})

const delExpense = (expenseId) => ({
    type: DELETE_EXPENSE,
    expenseId
})





//thunks
export const getAllExpenses = () => async (dispatch) => {
    const response = await fetch('/api/expenses/current')
    if (response.ok) {
        const res = await response.json()
        dispatch(loadAllExpenses(res))
    }
}

export const getOneExpense = (expenseId) => async (dispatch) => {
    const response = await fetch(`/api/expenses/${expenseId}`)
    if (response.ok) {
        const res = await response.json()
        dispatch(loadOneExpense(res))
    }
}

export const editOneExpense = (info, expenseId) => async (dispatch) => {
    const response = await fetch(`/api/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    if (response.ok) {
        const edited = await response.json()
        dispatch(editExpense(edited))
        return edited
    }
    else {
        const data = await response.json()
        if (data.errors){
            return data
        }
        else{
            return data
        }
    }

}


export const createExpense = (info) => async (dispatch) => {
    const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })

    if(response.ok){
        const newExpense = await response.json()
        dispatch(postExpense(newExpense))
        return newExpense
    }
    else{
        const data = await response.json()
        console.log(data, 'dataaaaaaaaaaaaaaaaa')
        if(data.errors){
            return data
        }
    }
}

export const createGroupExpense = (info) => async (dispatch) => {
    let { group_id } = info
    const response = await fetch(`/api/groups/${group_id}/expenses`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    if(response.ok){
        const newExpense = await response.json()
        dispatch(postGroupExpense(newExpense))
        return newExpense
    }
    else{
        const data = await response.json()
        if(data.errors){
            return data
        }
    }
}

export const deleteExpense = (expenseId) => async (dispatch) => {
    const response = await fetch(`/api/expenses/${expenseId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(delExpense(expenseId))
    }

}



//reducer
const initialState = {oneExpense: {}, payableExpenses: {}, receivableExpenses: {}}


const expensesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_EXPENSES:
            newState = {
                ...state,
                oneExpense: {...state.oneExpense},
                payableExpenses: {...state.payableExpenses},
                receivableExpenses: {...state.receivableExpenses}
            }
            action.allExpenses["Payable Expenses"].forEach(expense => {
                newState.payableExpenses[expense.id] = expense
            })
            action.allExpenses["Receivable Expenses"].forEach(expense => {
                newState.receivableExpenses[expense.id] = expense
            })
            return newState
        case GET_ONE_EXPENSE:
            newState = {
                ...state,
                oneExpense: {...state.oneExpense},
                payableExpenses: {...state.payableExpenses},
                receivableExpenses: {...state.receivableExpenses}
            }
            newState.oneExpense = action.oneExpense
            return newState
        case EDIT_ONE_EXPENSE:
            newState = {
                ...state,
                oneExpense: {...state.oneExpense},
                payableExpenses: {...state.payableExpenses},
                receivableExpenses: {...state.receivableExpenses}
            }
            newState.oneExpense = action.edited
            return newState
        case CREATE_EXPENSE:
            newState = {
                ...state,
                oneExpense: {...state.oneExpense},
                payableExpenses: {...state.payableExpenses},
                receivableExpenses: {...state.receivableExpenses}
            }
            newState.oneExpense = action.newCharge
            return newState
        case DELETE_EXPENSE:
            newState = {
                ...state,
                oneExpense: {...state.oneExpense},
                payableExpenses: {...state.payableExpenses},
                receivableExpenses: {...state.receivableExpenses}
            }
            if (newState.payableExpenses[action.expenseId]){
                delete newState.payableExpenses[action.expenseId]
            }
            else if (newState.receivableExpenses[action.expenseId]){
                delete newState.receivableExpenses[action.expenseId]
            }
            return newState
        case CREATE_GROUP_EXPENSE:
            newState = {
                ...state,
                oneExpense: {...state.oneExpense},
                payableExpenses: {...state.payableExpenses},
                receivableExpenses: {...state.receivableExpenses}
            }
            return newState
        default:
            return state
    }
}




export default expensesReducer;
