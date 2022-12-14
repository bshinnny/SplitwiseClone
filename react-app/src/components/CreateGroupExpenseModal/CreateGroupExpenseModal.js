// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { editOneExpense, getAllExpenses, getOneExpense, createExpense } from "../../store/expense";
// import { useHistory } from "react-router-dom";


// export default async function CreateGroupExpense({ setShowModal }) {
//     const dispatch = useDispatch()
//     const [description, setDescription] = useState("")
//     const [amount, setAmount] = useState(0)
//     const [note, setNote] = useState("")
//     const [recipientEmail, setRecipientEmail] = useState("")
//     const [errors, setErrors] = useState([])

//     let currentUserId = useSelector(state => state.session.user.id)
//     const history = useHistory()

//     // let my_groups_response = await fetch('/api/groups/current')
//     // if(my_groups_response.ok){
//     //     const my_groups = await my_groups_response.json()
//     //     console.log(my_groups)
//     // }


//     // const info = {
//     //     description,
//     //     amount,
//     //     note,
//     //     recipientEmail,
//     //     user_id: currentUserId,
//     // }


//     // const onSubmit = async (e) => {
//     //     e.preventDefault()

//     //     let updatedExpense = await dispatch(createExpense(info))
//     //     console.log(updatedExpense, 'updatedexpense-------')
//     //         if (updatedExpense.errors){
//     //             await setErrors(updatedExpense.errors)
//     //             console.log(errors, 'errors')
//     //         }
//     //         else{
//     //             setShowModal(false)
//     //         }

//     //     dispatch(getAllExpenses())

//     // }

//     return (
//         <div>Test</div>
//     )
// }

// //     return (
// //         <div>
// //             <h1>Create New Expense</h1>
// //             <div>
// //                 {errors && (
// //                     <ul>{errors}</ul>
// //                 )}
// //             </div>
// //             <form onSubmit={onSubmit}>

// //                 <input required
// //                     type="text"
// //                     onChange={(e) => setDescription(e.target.value)}
// //                     value={description}
// //                     placeholder="Description"></input>


// //                 <input required
// //                     type="number" min="0" step="0.01"
// //                     onChange={(e) => setAmount(e.target.value)}
// //                     value={amount}
// //                     placeholder="Amount"></input>

// //                 <input required
// //                     type="text"
// //                     onChange={(e) => setNote(e.target.value)}
// //                     value={note}
// //                     placeholder="Note"></input>

// //                 <input required
// //                     type="text"
// //                     onChange={(e) => setRecipientEmail(e.target.value)}
// //                     value={recipientEmail}
// //                     placeholder="Recipient Email"></input>

// //                 <button type="submit">Create Expense</button>
// //             </form>
// //         </div>


// //     )
// // }
