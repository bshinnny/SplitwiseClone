import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import CreateGroupExpense from "./CreateGroupExpenseModal"


export default function CreateGroupExpenseModal(){
    const [ showModal, setShowModal ] = useState(false)


    return (
        <>
        <button onClick={()=>setShowModal(true)}>Create Group Expense</button>
        {showModal && (
            <Modal onClose={()=>setShowModal(false)}>
                <CreateGroupExpense setShowModal={setShowModal} />
            </Modal>
        )}
        </>
    )

}
