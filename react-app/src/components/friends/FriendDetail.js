
import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect,useState,useMemo}from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getFriendDetail } from '../../store/friends';

const FriendDetail = () => {
    const {friendId} = useParams();
    const dispatch = useDispatch()
    const [noShared,setNoshared] = useState(false)

    useEffect(()=>{
        dispatch(getFriendDetail(friendId))
    },[])

    const userId =useSelector(state => state.session.user.id)
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
        return <p>You don't have any expenses yet</p>
      }
      else{
        expensesList = friendDetail.shared_expenses

      }
    
    }
    console.log("expensesList",expensesList)

  return (
    <div>
      {friendDetail && expensesList.map(
        (expense)=>expense.user_id === userId ? <li key ={expense.id} id ={expense.id}>{expense.description} you paid:{expense.amount*2} </li> : <li id ={expense.id}>{expense.description}  you owe:{expense.amount}</li>)}
      {/* {friendDetail && expensesList.map(expense=><li id ={expense.id}>{expense.description} {expense.amount}</li>) } */}
    </div>
  )
}

export default FriendDetail
