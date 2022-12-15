import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneExpense } from "../../store/expense";
import CommentsOfExpense from "../Comment/Comment";

export default function OneExpense({ setShowModal, expense }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOneExpense(expense.id))
    }, [])

    return (
        <div>
            <h2>{`${expense.description}`}</h2>
            <h3>{`$${expense.amount}`}</h3>
            <div>{`Added by ${expense.Fronter.first_name} on ${expense.date}`}</div>
            <CommentsOfExpense expense={expense} />
        <button onClick={() => setShowModal(false)}>Hide Expense Details</button>
        </div>


    )
}
