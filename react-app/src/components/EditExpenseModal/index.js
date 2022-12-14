import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import EditExpense from "./EditExpenseModal"


export default function EditExpenseModal({expense, setHasSubmitted}){
    const [ showModal, setShowModal ] = useState(false)


    return (
        <>
        <button onClick={()=>setShowModal(true)}>Edit Expense</button>
        {showModal && (
            <Modal onClose={()=>setShowModal(false)}>
                <EditExpense setShowModal={setShowModal} expense={expense} setHasSubmitted={setHasSubmitted} />
            </Modal>
        )}
        </>
    )

}
