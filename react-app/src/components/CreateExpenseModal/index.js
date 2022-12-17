import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import CreateExpense from "././CreateExpenseModal"



export default function CreateExpenseModal({expense, setHasSubmitted}){
    const [ showModal, setShowModal ] = useState(false)


    return (
        <>
        <button onClick={()=>setShowModal(true)} className="individual-charge-button">Add Individual Expense</button>
        {showModal && (
            <Modal onClose={()=>setShowModal(false)}>
                <CreateExpense setShowModal={setShowModal} expense={expense} setHasSubmitted={setHasSubmitted} />
            </Modal>
        )}
        </>
    )

}
