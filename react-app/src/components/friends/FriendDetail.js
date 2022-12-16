
import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect,useState,useMemo}from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getFriendDetail } from '../../store/friends';

import GroupsSidebar from "../Groups/GroupsSidebar";
import { NavLink } from "react-router-dom";
import FriendSideBar from './SideBar';



const FriendDetail = () => {
    const {friendId} = useParams();
    const dispatch = useDispatch()
    const [noShared,setNoshared] = useState(false)

    useEffect(()=>{
      console.log("friendId on useEffect",friendId)
        dispatch(getFriendDetail(friendId))
    },[dispatch,getFriendDetail,friendId])

    const userId = useSelector(state => state.session.user.id)
    console.log("UserID",userId)
    const info = useSelector(state=>state.friendDetail)
    console.log("info",info)
   
    const detailList = Object.values(info)
    console.log("frontend friend detail", detailList)
    const thisFriend = detailList.filter((detail)=>detail.id == friendId)

    console.log("))))))",thisFriend)
    const friendDetail = thisFriend[0]
    console.log("*********frienddetail",friendDetail)
    
    // console.log("friendDetail.shared_expenses",friendDetail.shared_expenses)
    let expensesList
    if(friendDetail) {
      if((friendDetail.shared_expenses).length === 0) {
      expensesList = 0
      }
      else{
        expensesList = friendDetail.shared_expenses

      }
    
    }
    console.log("expensesList",expensesList)

  return (
    <div className='outer-container'>
      <div className='left-side'>
            <div className='left-empty-div'>
            </div>
            <div className='right-side-bar-div'>
                <div className='active-side-bar'>
                    <div className='dashboard'>dashboard</div>
                    <div className='all-expenses'><NavLink to="/expenses/all">All Expenses</NavLink></div>
                    <div className='group'>group</div>
                    <div className='all-expenses'>all expenses</div>
                    <div className='group'><GroupsSidebar/></div>
                    <div className='friends'><FriendSideBar/></div>
                </div>
            </div>
      </div>
      <div className='middle-side'>
            <div className='title'>
                <p>title</p>
            </div>
            <div className='content'>
            <div>
      {friendDetail && expensesList ? expensesList.map(
        (expense)=>expense.user_id === userId ? <li key ={expense.id} id ={expense.id}>{expense.description} you paid:{expense.amount*2} </li> : <li id ={expense.id}>{expense.description}  you owe:{expense.amount}</li>) : <p>You don't have any expenses yet</p>}
      {/* {friendDetail && expensesList.map(expense=><li id ={expense.id}>{expense.description} {expense.amount}</li>) } */}
    </div>
            </div>
      </div>
      <div className='right-side'>
            <div className='left-with-info'>
                <p>left with infor</p>
            </div>
            <div className='right-empty'>
                <p>right-empty</p>
            </div>
      </div>
    </div>
  
    
    

    
  )
}

export default FriendDetail
