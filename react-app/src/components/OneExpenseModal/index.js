import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import OneExpense from "./OneExpense"

export default function OneExpenseModal({expense}){
    const [ showModal, setShowModal ] = useState(false)


    return (
        <>
        <button onClick={()=>setShowModal(!showModal) } className="expense-details-button">{showModal ? "Hide Details" : "Show Details"}</button>
        {showModal && (
            // <Modal onClose={()=>setShowModal(false)}>
                <OneExpense setShowModal={setShowModal} expense={expense} />
            // </Modal>
        )}
        </>
    )

}
