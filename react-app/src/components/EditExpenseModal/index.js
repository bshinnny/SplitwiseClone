import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import EditExpense from "./EditExpenseModal"
import "./EditExpenseModal.css"


export default function EditExpenseModal({expense, setHasSubmitted}){
    const [ showModal, setShowModal ] = useState(false)


    return (
        <>
        <button onClick={()=>setShowModal(true)} className="edit-expense-button">Edit Expense</button>
        {showModal && (
            <Modal onClose={()=>setShowModal(false)}>
                <EditExpense setShowModal={setShowModal} expense={expense} setHasSubmitted={setHasSubmitted} />
            </Modal>
        )}
        </>
    )

}
