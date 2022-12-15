import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllExpenses, deleteExpense } from "../../store/expense";
import CreateExpenseModal from "../CreateExpenseModal";
import CreateGroupExpenseModal from "../CreateGroupExpenseModal";
import EditExpenseModal from "../EditExpenseModal";
import OneExpenseModal from "../OneExpenseModal";
import './AllExpenses.css'


export default function AllExpenses() {
    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)

    let currentUser = useSelector(state => state.session.user)

    let myPayableExpenses = useSelector(state => state.expense.payableExpenses)
    let myReceivableExpenses = useSelector(state => state.expense.receivableExpenses)

    let allExpenses = {...myPayableExpenses, ...myReceivableExpenses}


    useEffect(() => {
        dispatch(getAllExpenses())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getOneExpense(expenseId))
    // }, [])

    return (
        <>
            <h1>Test</h1>
            <CreateExpenseModal />
            <CreateGroupExpenseModal />
            {Object.values(allExpenses).map((expense) => {
                return (
                    <div key={`expense ${expense.id}`} className="expense-row">

                    {expense.id}. {currentUser.id == expense.Fronter.id ? `${expense.Recipient.first_name} ${expense.Recipient.last_name} owes you: $${expense.amount} ` : `You Owe: ${expense.Fronter.first_name} ${expense.Fronter.last_name} $${expense.amount}`}
                    <OneExpenseModal expense={expense} />
                    <EditExpenseModal expense={expense} setHasSubmitted={setHasSubmitted} />
                    <button onClick={()=> dispatch(deleteExpense(expense.id))}>Delete Expense</button>
                    </div>
                )
            })}

        </>
    )

}
