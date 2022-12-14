import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import CreateExpense from "././CreateExpenseModal"


export default function CreateExpenseModal({expense, setHasSubmitted}){
    const [ showModal, setShowModal ] = useState(false)


    return (
        <>
        <button onClick={()=>setShowModal(true)}>Create New Expense</button>
        {showModal && (
            <Modal onClose={()=>setShowModal(false)}>
                <CreateExpense setShowModal={setShowModal} expense={expense} setHasSubmitted={setHasSubmitted} />
            </Modal>
        )}
        </>
    )

}
