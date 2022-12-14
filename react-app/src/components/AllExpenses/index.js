import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllExpenses } from "../../store/expense";
import OneExpenseModal from "../OneExpenseModal";


export default function AllExpenses() {
    const dispatch = useDispatch()

    let currentUser = useSelector(state => state.session.user)

    let myPayableExpenses = useSelector(state => state.expense.payableExpenses)
    let myReceivableExpenses = useSelector(state => state.expense.receivableExpenses)

    let allExpenses = {...myPayableExpenses, ...myReceivableExpenses}
    console.log(allExpenses, 'all expenses displayed')


    useEffect(() => {
        dispatch(getAllExpenses())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getOneExpense(expenseId))
    // }, [])

    return (
        <>
            <h1>Test</h1>
            {Object.values(allExpenses).map((expense) => {
                return (
                    <div>

                    {/* {expense.id}. {currentUser.id == expense.Fronter.id  ? `You Owe: ${expense.Recipient.first_name} ${expense.Recipient.last_name}` : `${expense.Recipient.first_name} ${expense.Recipient.last_name} owes you: ` }, {`$${expense.amount}`} */}
                    {expense.id}. {currentUser.id == expense.Fronter.id ? `${expense.Recipient.first_name} ${expense.Recipient.last_name} owes you: $${expense.amount} ` : `You Owe: ${expense.Fronter.first_name} ${expense.Fronter.last_name} $${expense.amount}`}
                    <OneExpenseModal expense={expense} />
                    </div>
                )
            })}

        </>
    )

}
