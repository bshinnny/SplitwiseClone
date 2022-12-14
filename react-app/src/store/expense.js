

const GET_ALL_EXPENSES = "expenses/GET_ALL_EXPENSES";
const GET_ONE_EXPENSE = "expenses/GET_ONE_EXPENSE";


//action creators
const loadAllExpenses = (allExpenses) => ({
    type: GET_ALL_EXPENSES,
    allExpenses
})

const loadOneExpense = (oneExpense) => ({
    type: GET_ONE_EXPENSE,
    oneExpense
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
        default:
            return state
    }
}




export default expensesReducer;
