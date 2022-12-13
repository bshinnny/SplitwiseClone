import React, { useEffect, useState } from "react";
import "./Modal.css"
import {createFriend} from "../../store/friends";
import { useDispatch } from "react-redux";

export default function AddingFriendForm({closeModal}){
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()

    const formSubmission=(e)=>{
        e.preventDefault()
        dispatch(createFriend(email))
    }


    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={()=>{closeModal(false)}}> X </button>
                </div>
                <div className="title">
                    <h1>Invite a Friend</h1>
                </div>
                <div className="body">
                    <form onSubmit={formSubmission}>
                        <label>email</label>
                        <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} required></input>
                        <button type="submit">add</button>
                    </form>
                </div>
            </div>

        </div>
    )
}