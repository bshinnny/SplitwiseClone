import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllFriends,deletingFriend} from "../../store/friends";
import AddingFriendForm from './AddingFriendForm'
import {Link} from 'react-router-dom';
import DeleteWarning from "./DeleteWarning";





export default function FriendSideBar(){
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [errors, setErrors] = useState()
    

    const allFriends = useSelector(state=>state.friends)
    console.log("friends from side bar", allFriends)
    const friends = Object.values(allFriends)
    console.log("value",friends)

    useEffect(()=>{
        console.log("sidebar 1")
        dispatch(getAllFriends())
        console.log("sidebar 2")
    },[])

    const handleDelete =(e)=>{
        console.log("friend_id at form handling",e.target.id)
        const friend_id = e.target.id
        console.log("friend id",friend_id)
        dispatch(deletingFriend(friend_id))
    }


    return (
        
        <div className="friends-side-bar">
        <div className="add friends sign">
            <p>FRIENDS <button onClick={()=>setOpenModal(true)}>&#x2795; add</button></p>
            {openModal && <AddingFriendForm closeModal={setOpenModal} />}
            
        </div>
        {!friends.length && <p>You have not added any friend yet</p>}
        {friends.length && friends.map(friend =>(<li key={friend.id}><Link to={`/friends/${friend.id}`}>{friend.first_name} {friend.last_name}</Link> <button id={friend.id} onClick={handleDelete}>X</button></li>)) }
        </div>
    )
}