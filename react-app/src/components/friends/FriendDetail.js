
import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect,useState,useMemo}from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getFriendDetail } from '../../store/friends';

import GroupsSidebar from "../Groups/GroupsSidebar";
import { NavLink } from "react-router-dom";
import FriendSideBar from './SideBar';
import userImg from '../../assets/profileImg.png'
import "./FriendDetail.css";
import nothingImg from "../../assets/person.png"




const FriendDetail = () => {
    const {friendId} = useParams();
    const dispatch = useDispatch()
    const [noShared,setNoshared] = useState(false)

    useEffect(()=>{
      
        dispatch(getFriendDetail(friendId))
    },[dispatch,getFriendDetail,friendId])

    const userId = useSelector(state => state.session.user.id)
   
    const info = useSelector(state=>state.friendDetail)
  

    const detailList = Object.values(info)
   
    const thisFriend = detailList.filter((detail)=>detail.id == friendId)

    
    const friendDetail = thisFriend[0]
    


    let expensesList
    // let youPaid = 0
    // let total = 0
    // let friendPaid = 0
    let fullDate
    if(friendDetail) {
      if((friendDetail.shared_expenses).length === 0) {
      expensesList = 0
      }
      else{
        expensesList = friendDetail.shared_expenses
        // for(let i = 0; i< expensesList.length; i++) {
        //   let expense = expensesList[i];
        //   let amount = expense.amount
        //   total += amount
        //   if(expense.user_id === userId){
        //     youPaid += (expense.amount) *2
        //   }
        //   if(expense.user_id !== userId) {
        //     friendPaid += (expense.amount) *2
        //   }
        // }

      }

    }
    // let friendOweYou = total - youPaid
    // let youOwnFriends = total - friendPaid
    // console.log("expensesList",expensesList)
    // console.log("totalamout", total*2)
    // console.log("yourPaid", youPaid)
    // console.log("friendPaid", friendPaid)
    // console.log("friendoweYOu",friendOweYou)
    // console.log("you own Friens",youOwnFriends)

  return (
    <div className='outer-container'>
      <div className='left-side'>
            <div className='left-empty-div'>
            </div>
            <div className='right-side-bar-div'>
                <div className='active-side-bar'>
                <div className='dashboard '><i class="fa-solid fa-house"></i>&nbsp; <NavLink className="dashboard-link" to="/dashboard">Dashboard</NavLink></div>
                <div className='all-expenses'><i class="fa-solid fa-list">&nbsp; </i><NavLink className="all-expenses-link" to="/expenses/all">All Expenses</NavLink></div>
                    {/* <div className='group'>group</div>
                    <div className='all-expenses'>all expenses</div> */}
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
        <div className='owe-paid-div'><span className='payment-des'>{friendDetail.first_name} paid <p className='paid-dollar'>${expense.amount*2}</p></span> <span className='payment-des'> you lent {friendDetail.first_name}<p className='lent-dollar'>${expense.amount}</p></span></div></li>) :<div className='nothing'><img src={nothingImg}/><p className='p-nothing'>You don't have any expenses yet</p></div>}
      {/* {friendDetail && expensesList.map(expense=><li id ={expense.id}>{expense.description} {expense.amount}</li>) } */}
    </div>
            </div>
      </div>



      <div className='right-side'>
            <div className='left-with-info'>
              <div className='right-balance-div'>
                <h3 className='your-balance'>FRIEND INFORMATION</h3>
                <div className='balance-content'>
                {friendDetail &&<> <p  >Email:<p className='email-address'> {friendDetail.email}</p></p><p>You are firend with {friendDetail.first_name} {
                  friendDetail.last_name} since: <p className='created-year'> {(friendDetail.createdAt).substring(0,17)}</p> </p></> }
                
                {/* {(friendDetail && expensesList) && {youOwnFriends} > 0 && <p>{friendDetail.first_name} owe you {friendOweYou}</p>}
                {(friendDetail && expensesList) && {youOwnFriends} < 0 && <p>You own {friendDetail.first_name} {Math.abs(youOwnFriends)}</p>}
                {friendDetail && !expensesList && <p>You are all settled up</p>} */}
                </div>
              </div>
            </div>
            <div className='right-empty'>
            </div>
      </div>
    </div>





  )
}

export default FriendDetail
