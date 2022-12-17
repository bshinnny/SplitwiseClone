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
                <div className="addingFormtitle">
                   <img src="https://s3.amazonaws.com/itunes-images/app-assets/458023433/80793600/458023433-80793600-circularArtwork-300.jpg" alt="logo"></img>&nbsp; <h2>Invite a Friend</h2>
                </div>
                <div className="body">
                    <form onSubmit={formSubmission}>
                        <input className="inputEmail" type="email" placeholder="email address" onChange={(e)=>setEmail(e.target.value)} required></input>
                        <p className="addButton"><button type="submit" className="add-friend-button">Add friend</button></p>
                    </form>
                </div>
            </div>

        </div>
    )
}
