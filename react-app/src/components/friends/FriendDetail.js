
import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect,useState,useMemo}from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getFriendDetail } from '../../store/friends';

const FriendDetail = () => {
    const {friendId} = useParams();
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getFriendDetail(friendId))
    },[])

    const info = useSelector(state=>state.friendDetail)
 
    const detail = Object.values(info)[0]
    console.log("frontend friend detail", detail)

    let expensesList
    if(detail){
        expensesList = detail.shared_expenses
    }
    console.log("&&&&&&&&",expensesList)

  return (
    <div>
     <p>Hello</p>
      {detail && expensesList.map(expense=><li>{expense.description} {expense.amount}</li>) }
    </div>
  )
}

export default FriendDetail
