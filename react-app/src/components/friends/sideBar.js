import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {getAllFriends} from "../../store/friends";


export default function FriendSideBar(){
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("sidebar 1")
        dispatch(getAllFriends())
        console.log("sidebar 2")
    },[])


    return (
        <div>
            <h1>Hello friends</h1>
        </div>
    )
}