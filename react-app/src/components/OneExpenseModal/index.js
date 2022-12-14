import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import OneExpense from "./OneExpense"

export default function OneExpenseModal({expense}){
    const [ showModal, setShowModal ] = useState(false)


    return (
        <>
        <button onClick={()=>setShowModal(true)}>View Expense</button>
        {showModal && (
            // <Modal onClose={()=>setShowModal(false)}>
                <OneExpense setShowModal={setShowModal} expense={expense} />
            // </Modal>
        )}
        </>
    )

}
