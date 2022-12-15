import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOneExpense, getAllExpenses, getOneExpense } from "../../store/expense";
import { useHistory } from "react-router-dom";


export default function EditExpense({ setShowModal, expense, setHasSubmitted }) {
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState(0)
    const [note, setNote] = useState("")
    const [errors, setErrors] = useState([])

    let currentUser = useSelector(state => state.session.user)
    const history = useHistory()

    useEffect(() => {
        dispatch(getOneExpense(expense.id))
    }, [dispatch, expense.id])

    useEffect(() => {
        if (expense) {
            setDescription(expense.description)
            setAmount(expense.amount)
            setNote(expense.note)
        }
    }, [expense])

    const info = {
        description,
        amount,
        note
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        let updatedExpense = await dispatch(editOneExpense(info, expense.id))
            // .then(()=> setShowModal(false))
            // .then(() => setHasSubmitted(prevVal => !prevVal))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors)
            // })
            if (updatedExpense?.errors) {
                setErrors(updatedExpense.errors)
            }
            else {
                setShowModal(false)
            }

        dispatch(getAllExpenses())


        // if (updatedExpense) {
        //     setErrors([])
        //     history.push('/expenses/all')
        // }
    }

    return (
        <div>
            <h1>Update Your Expense</h1>
            <ul>
                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={onSubmit}>

                <input required
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Description"></input>


                <input required
                    type="number" min="0" step="0.01"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    placeholder="Amount"></input>

                <input required
                    type="text"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    placeholder="Note"></input>

                <button type="submit" className="edit-submit-button">Save Changes</button>
            </form>
        </div>


    )
}
