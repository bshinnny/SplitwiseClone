import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneExpense } from "../../store/expense";


export default function OneExpense({ setShowModal, expense }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOneExpense(expense.id))
    }, [])
    console.log(expense, 'expenseeeeeeeeeeeeeeeeeeeeeeee')

    return (
        <div>
            <h2>{`${expense.description}`}</h2>
            <h3>{`$${expense.amount}`}</h3>
            <div>{`Added by ${expense.Fronter.first_name} on ${expense.date}`}</div>

        <button onClick={() => setShowModal(false)}>Hide Expense Details</button>
        </div>


    )
}
