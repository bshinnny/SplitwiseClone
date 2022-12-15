import React, { useEffect, useState } from "react";
import "./Modal.css"
import {createFriend} from "../../store/friends";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import {getAllFriends} from "../../store/friends";


export default function AddingFriendForm({closeModal}){
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState()
    const dispatch = useDispatch()
    const history = useHistory()

    const formSubmission= async(e)=>{
        e.preventDefault();

        setErrors([]);

        try {
            const data = await dispatch(createFriend(email))
            if (data.error) {
                await setErrors(data.error);
            } else {
                dispatch(getAllFriends())
                // history.push(`/friends/current`)
                closeModal()
            }
        } catch (error) {
            console.log(error)
        }

        
    }


    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className='errors'>
                    {errors && (
                        <div className='errors'>{errors}</div>
                    )}
                </div>
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