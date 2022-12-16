import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOneExpense, getAllExpenses, getOneExpense, createExpense, createGroupExpense } from "../../store/expense";
import { getUserGroupsThunk } from "../../store/groups";
import { useHistory } from "react-router-dom";


export default function CreateGroupExpense({ setShowModal }) {
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState(0)
    const [note, setNote] = useState("")
    const [recipientEmail, setRecipientEmail] = useState("")
    const [groupId, setGroupId] = useState(0)
    const [errors, setErrors] = useState([])

    let currentUserId = useSelector(state => state.session.user.id)
    let userGroups = useSelector(state => state.groups.userGroups)
    let userGroupsArr = Object.values(userGroups)
    console.log(userGroupsArr, 'arrrrrrrrrrrrrr')

    useEffect(() => {
        dispatch(getUserGroupsThunk())
    }, [dispatch])


    const info = {
        description,
        amount,
        note,
        user_id: currentUserId,
        group_id: groupId
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        if(groupId === 0 || groupId ==="Select A Group"){
            setErrors("Please select a group")
        }
        else{
            let newGroupExpense = await dispatch(createGroupExpense(info))

            if (newGroupExpense.errors) {
                setErrors(newGroupExpense.errors)
            }
            else{
                setShowModal(false)
            }

        }

        dispatch(getAllExpenses())

    }


    console.log(groupId, 'GROUP IDDDD')
    return (
        <div className="modal-expense-entire">
            <div className="modal-expense-header">Create New Group Expense</div>
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

                <div className="expense-form-input">Total Amount</div>
                <input required
                    type="number" min="0" step="0.01"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    placeholder="Total Amount"></input>

                <div className="expense-form-input">Note</div>
                <input required
                    type="text"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    placeholder="Note"></input>

                <div className="expense-form-input">Your Groups</div>
                <select required
                    name="group"
                    type="text"
                    onChange={(e) => setGroupId(e.target.value)}
                    value={groupId}
                    className="expenses-last-form-element"
                    >

                    <option style={{color:"gray"}}>Select A Group</option>
                    {userGroupsArr && userGroupsArr.map(group =>
                        <option value={group.id} key={group.id}>{group.name}</option>)}
                    </select>


                <button type="submit" className="expense-form-submit-button">Create Expense</button>
            </form>
        </div>
                    //     {user_groups && user_groups.groups.map(group =>
                    //         <option value={group.id} key={group.id}>{group.name}</option>
                    //   )}

    )
}
