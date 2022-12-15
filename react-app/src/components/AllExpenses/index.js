import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllExpenses, deleteExpense } from "../../store/expense";
import CreateExpenseModal from "../CreateExpenseModal";
import CreateGroupExpenseModal from "../CreateGroupExpenseModal";
import EditExpenseModal from "../EditExpenseModal";
import OneExpenseModal from "../OneExpenseModal";
import './AllExpenses.css'


export default function AllExpenses() {
    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)

    let currentUser = useSelector(state => state.session.user)

    let myPayableExpenses = useSelector(state => state.expense.payableExpenses)
    let myReceivableExpenses = useSelector(state => state.expense.receivableExpenses)

    let allExpenses = { ...myPayableExpenses, ...myReceivableExpenses }


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
                        <p>left-empty-div</p>
                        <p>right-side-bar-div</p>
                    </div>
                    <div className='right-side-bar-div'>
                        <div className='active-side-bar'>
                            <div className='dashboard'>dashboard</div>
                            <div className='all-expenses'><NavLink to="/expenses/all">All Expenses</NavLink></div>
                            <div className='group'>group</div>
                            <div className='friends'>friends</div>
                        </div>
                    </div>
                </div>
                <div className='middle-side'>
                    <div className='title'>
                        <p>title</p>
                    </div>
                    <div className='content'>
                        <p>
                            <>
                                <h1>Test</h1>
                                <CreateExpenseModal />
                                <CreateGroupExpenseModal />
                                {Object.values(allExpenses).map((expense) => {
                                    return (
                                        <div key={`expense ${expense.id}`} className="expense-row">

                                            {expense.id}. {currentUser.id == expense.Fronter.id ? `${expense.Recipient.first_name} ${expense.Recipient.last_name} owes you: $${expense.amount} ` : `You Owe: ${expense.Fronter.first_name} ${expense.Fronter.last_name} $${expense.amount}`}
                                            <OneExpenseModal expense={expense} />
                                            <EditExpenseModal expense={expense} setHasSubmitted={setHasSubmitted} />
                                            <button onClick={() => dispatch(deleteExpense(expense.id))}>Delete Expense</button>
                                        </div>
                                    )
                                })}

                            </>


                        </p>
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
