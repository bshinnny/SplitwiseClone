import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllFriends,deletingFriend} from "../../store/friends";
import AddingFriendForm from './AddingFriendForm'
import {Link, useHistory} from 'react-router-dom';
import DeleteWarning from "./DeleteWarning";
import { Modal } from '../../context/Modal';



import "./SideBar.css"





export default function FriendSideBar(){
    const history = useHistory
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
        // history.push("/")

    }


    return (
        
        <div className="friends-side-bar">
        <div className="add-friends-sign">
            <p className="p-friends">FRIENDS<button onClick={()=>setOpenModal(true)} className="addBtn"><i class="fa-duotone fa-plus"></i> add</button></p>
            {openModal && 
                <Modal onClose={() => setOpenModal(false)}>
                <AddingFriendForm closeModal={setOpenModal} />
                </Modal>
            }
            
        </div>
        {!friends.length && <p>You have not added any friend yet</p>}
        {friends.length && friends.map(friend =>(<div className="firend-deleteBtn"><li className="li-name" key={friend.id}><Link to={`/friends/${friend.id}`} className="friend-name">
        <div className="friends-names"><i class="fa-solid fa-user"></i>&nbsp;{friend.first_name} {friend.last_name}</div></Link> <div className="deleBtndiv"><button id={friend.id} onClick={handleDelete} className="deleteBtn">x</button></div></li></div>)) }
        </div>
    )
}