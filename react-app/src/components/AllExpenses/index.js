import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllExpenses, deleteExpense } from "../../store/expense";
import CreateExpenseModal from "../CreateExpenseModal";
import CreateGroupExpenseModal from "../CreateGroupExpenseModal";
import EditExpenseModal from "../EditExpenseModal";
import OneExpenseModal from "../OneExpenseModal";
import GroupsSidebar from "../Groups/GroupsSidebar";
import FriendSideBar from "../friends/SideBar";
import './AllExpenses.css'


export default function AllExpenses() {
    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)

    let currentUser = useSelector(state => state.session.user)

    let myPayableExpenses = useSelector(state => state.expense.payableExpenses)
    let myReceivableExpenses = useSelector(state => state.expense.receivableExpenses)

    let allExpenses = { ...myPayableExpenses, ...myReceivableExpenses }


    let totalLentOut = 0
    for (let expense of Object.values(allExpenses)){
        if (expense.Fronter.id === currentUser.id) {
            totalLentOut += expense.amount
        }
    }

    let totalOwed = 0
    for (let expense of Object.values(allExpenses)){
        if (expense.Recipient.id === currentUser.id) {
            totalOwed += expense.amount
        }
    }

    useEffect(() => {
        dispatch(getAllExpenses())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getOneExpense(expenseId))
    // }, [])

    return (
        <div className='outer-container'>
            <div className='left-side'>
                <div className='left-empty-div'>
                    <p></p>
                    <p></p>
                </div>
                <div className='right-side-bar-div'>
                    <div className='active-side-bar'>
                        <div className='dashboard'><NavLink to="/dashboard">Dashboard</NavLink></div>
                        <div className='all-expenses'><i class="fa-solid fa-list">&nbsp; </i><NavLink className="all-expenses-link" to="/expenses/all">All Expenses</NavLink></div>
                        <div className='group'><GroupsSidebar /></div>
                        <div className='friends'><FriendSideBar /></div>
                    </div>
                </div>
            </div>
            <div className='middle-side'>
                <div className='title'>
                    <h1 className="header-all-expenses">All Expenses</h1>
                </div>
                <div className='content'>
                    <div>
                        <div>
                            <div className="create-buttons">
                                <CreateExpenseModal />
                                <CreateGroupExpenseModal />
                            </div>
                            {Object.values(allExpenses).map((expense) => {
                                return (
                                    <div key={`expense ${expense.id}`} className="expense-row">

                                        <div>
                                            <div id="expense-date">{expense.date.slice(5, 17)}</div>
                                            {currentUser.id == expense.Fronter.id ?
                                                <div className="expense-green">
                                                    <div>
                                                        <span id="expense-recipient-name">{expense.Recipient.first_name} {expense.Recipient.last_name}&nbsp;</span>
                                                        owes you:&nbsp;
                                                    </div>
                                                    <span id="expense-recipient-amount">${expense.amount}
                                                    </span>
                                                </div>
                                                :
                                                <div className="expense-red">
                                                    <div>You owe:&nbsp;
                                                        <span id="expense-fronter-name">{expense.Fronter.first_name} {expense.Fronter.last_name}&nbsp;</span>
                                                    </div>
                                                        <span id="expense-fronter-amount"> ${expense.amount}</span>
                                                </div>}
                                        </div>
                                        <OneExpenseModal expense={expense} setHasSubmitted={setHasSubmitted} />
                                        {/* <div>
                                            <EditExpenseModal expense={expense} setHasSubmitted={setHasSubmitted} />
                                            <button onClick={() => dispatch(deleteExpense(expense.id))} className="expense-delete-button">Delete Expense</button>
                                        </div> */}
                                    </div>
                                )
                            })}

                        </div>


                    </div>
                </div>
            </div>
            <div className='right-side'>
                <div className='left-with-info'>
                    <h3 className="total-balance-header">Your Total Balance</h3>
                    <div className="you-are-owed">You are Owed: ${totalLentOut.toFixed(2)}</div>
                    <div className="you-owe">Total You Owe: ${totalOwed.toFixed(2)} </div>
                    {/* <div className="your-net-expenses">Net: ${(totalLentOut.toFixed(2) - totalOwed.toFixed(2)).toFixed(2)} </div> */}
                </div>
                <div className='right-empty'>
                    <p></p>
                </div>
            </div>
        </div>
    )

    // return (
    //     <>
    //         <h1>Test</h1>
    //         <CreateExpenseModal />
    //         <CreateGroupExpenseModal />
    //         {Object.values(allExpenses).map((expense) => {
    //             return (
    //                 <div key={`expense ${expense.id}`} className="expense-row">

    //                 {expense.id}. {currentUser.id == expense.Fronter.id ? `${expense.Recipient.first_name} ${expense.Recipient.last_name} owes you: $${expense.amount} ` : `You Owe: ${expense.Fronter.first_name} ${expense.Fronter.last_name} $${expense.amount}`}
    //                 <OneExpenseModal expense={expense} />
    //                 <EditExpenseModal expense={expense} setHasSubmitted={setHasSubmitted} />
    //                 <button onClick={()=> dispatch(deleteExpense(expense.id))}>Delete Expense</button>
    //                 </div>
    //             )
    //         })}

    //     </>
    // )

}
