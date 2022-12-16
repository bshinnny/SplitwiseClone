import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOneExpense, getAllExpenses, getOneExpense, createExpense } from "../../store/expense";
import { useHistory } from "react-router-dom";
import './CreateExpenseModal.css'


export default function CreateExpense({ setShowModal, expense, setHasSubmitted }) {
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState(0)
    const [note, setNote] = useState("")
    const [recipientEmail, setRecipientEmail] = useState("")
    const [errors, setErrors] = useState([])

    let currentUserId = useSelector(state => state.session.user.id)
    const history = useHistory()

    // useEffect(() => {
    //     dispatch(getOneExpense(expense.id))
    // }, [dispatch, expense.id])


    const info = {
        description,
        amount,
        note,
        recipientEmail,
        user_id: currentUserId,
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        let updatedExpense = await dispatch(createExpense(info))
            // .then(()=> setShowModal(false))
            // .then(() => setHasSubmitted(prevVal => !prevVal))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors)
            // })
            if (updatedExpense.errors){
                await setErrors(updatedExpense.errors)
                console.log(errors, 'errors')
            }
            else{
                setShowModal(false)
            }

        dispatch(getAllExpenses())

    }


    return (
        <div className="modal-expense-entire">
            <div className="modal-expense-header">Add New Expense</div>
            <div>
                {errors && (
                    <ul>{errors}</ul>
                )}
            </div>
            <form onSubmit={onSubmit} className="expense-form">

                <div className="expense-form-input">Description</div>
                <input required
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Description"></input>

                <div className="expense-form-input">Request Amount</div>
                <input required
                    type="number" min="0" step="0.01"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    placeholder="Amount"></input>

                <div className="expense-form-input">Note</div>
                <input required
                    type="text"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    placeholder="Note"></input>

                <div className="expense-form-input">Recipient Email</div>
                <input required
                    type="text"
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    value={recipientEmail}
                    placeholder="Recipient Email"
                    className="expenses-last-form-element"></input>

                <button type="submit" className="expense-form-submit-button">Create Expense</button>
            </form>
        </div>


    )
}
