
import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect,useState,useMemo}from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getFriendDetail } from '../../store/friends';

import GroupsSidebar from "../Groups/GroupsSidebar";
import { NavLink } from "react-router-dom";
import FriendSideBar from './SideBar';
import userImg from '../../assets/profileImg.png'
import "./FriendDetail.css";




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
    let youPaid
    let otherOwn
    let total  
    if(friendDetail) {
      if((friendDetail.shared_expenses).length === 0) {
      expensesList = 0
      }
      else{
        expensesList = friendDetail.shared_expenses
        // for()

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
              <div className='title-information'>
               <img className='user-Profile-Image' src={userImg} alt="user Profile Image"/> {friendDetail && <h2 className='friend-name'>{friendDetail.first_name + " "}{friendDetail.last_name}</h2>}
            </div>
            </div>
            <div className='content'>
            <div>
      {friendDetail && expensesList ? expensesList.map(
        (expense)=>expense.user_id === userId ? 
        <li className='expense-lists' key ={expense.id} id ={expense.id}><div className='description-div'><i class="fa-solid fa-receipt"></i>&nbsp;
        {"   " + expense.description}</div> <div className='owe-paid-div'><span className='payment-des'>you paid<p className='paid-dollar'>${expense.amount*2}</p></span><span className='payment-des'>{friendDetail.first_name} lent you <p className='lent-dollar'>${expense.amount}</p></span></div></li> 
        : <li className='expense-lists' id ={expense.id}><div className='description-div'><i class="fa-solid fa-receipt"></i>&nbsp;{"   "+expense.description}</div>
        <div className='owe-paid-div'><span className='payment-des'>{friendDetail.first_name} paid <p className='paid-dollar'>${expense.amount*2}</p></span> <span className='payment-des'> you lent {friendDetail.first_name}<p className='lent-dollar'>${expense.amount}</p></span></div></li>) : <p>You don't have any expenses yet</p>}
      {/* {friendDetail && expensesList.map(expense=><li id ={expense.id}>{expense.description} {expense.amount}</li>) } */}
    </div>
            </div>
      </div>



      <div className='right-side'> 
            <div className='left-with-info'>
              <div className='right-balance-div'>
                <h1>YOUR BALANCE</h1>
              </div>
            </div>
            <div className='right-empty'>
            </div>
      </div>
    </div>
  
    
    

    
  )
}

export default FriendDetail
