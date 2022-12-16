import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneExpense } from "../../store/expense";
import CommentsOfExpense from "../Comment/Comment";
import EditExpenseModal from "../EditExpenseModal";
import { deleteExpense } from "../../store/expense";
import './OneExpenseModal.css';

export default function OneExpense({ expense, setHasSubmitted }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOneExpense(expense.id))
    }, [dispatch, expense.id])

    return (
        <div className="one-expense-total-container">
            <div className="one-expense-container">
                <div className="note-image"><i className="fa-regular fa-note-sticky"></i></div>
                <div className="one-expense-text">
                    <div id="one-expense-description">{`${expense.description}`}</div>
                    <div id="one-expense-amount">{`$${expense.amount}`}</div>
                    <div id="one-expense-added-by">{`Added by ${expense.Fronter.first_name} on ${expense.date.slice(0, 16)}`}</div>
                </div>
            </div>
            <CommentsOfExpense expense={expense} />
            <div>
                <EditExpenseModal expense={expense} setHasSubmitted={setHasSubmitted} />
                <button onClick={() => dispatch(deleteExpense(expense.id))} className="expense-delete-button">Delete Expense</button>
            </div>
        </div>

    )
}
