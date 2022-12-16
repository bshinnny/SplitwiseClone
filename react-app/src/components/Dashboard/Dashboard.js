import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import AllExpenses from '../AllExpenses'
import GroupsSidebar from '../Groups/GroupsSidebar'
import FriendSideBar from '../friends/SideBar'
import CreateExpenseModal from '../CreateExpenseModal'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllExpenses } from '../../store/expense'

const Dashboard = () => {
    const dispatch = useDispatch()



    let currentUser = useSelector(state => state.session.user)

    let myPayableExpenses = useSelector(state => state.expense.payableExpenses)
    let myReceivableExpenses = useSelector(state => state.expense.receivableExpenses)

    let allExpenses = { ...myPayableExpenses, ...myReceivableExpenses }
    console.log(allExpenses, '--------------allexpenses')

    useEffect(() => {
        dispatch(getAllExpenses())
    }, [dispatch])

    let totalLentOut = 0
    for (let expense of Object.values(allExpenses)) {
        if (expense.Fronter.id === currentUser.id) {
            totalLentOut += expense.amount
        }
    }

    let totalOwed = 0
    for (let expense of Object.values(allExpenses)) {
        if (expense.Recipient.id === currentUser.id) {
            totalOwed += expense.amount
        }
    }


    // payable = people you owe

    //find all users you owe money to.
    //will get [{id:amountOwed, first_name: last_name}]
    let youOweUsers = []
    for (let expense of Object.values(myPayableExpenses)) {
        let personYouOwe = youOweUsers.find(user => user.id === expense.Fronter.id)

        if (personYouOwe) {
            personYouOwe.amount += expense.amount
        }
        else {
            let newObj = {}
            newObj.id = expense.Fronter.id
            newObj.amount = expense.amount
            newObj.first_name = expense.Fronter.first_name
            newObj.last_name = expense.Fronter.last_name
            youOweUsers.push(newObj)
        }

    }

    console.log(youOweUsers, 'youoweusers-----------------------------------')

    let othersOweYou = []
    for (let expense of Object.values(myReceivableExpenses)){
        let personOwesYou = othersOweYou.find(user => user.id === expense.Recipient.id)

        if (personOwesYou) {
            personOwesYou.amount += expense.amount
        }
        else {
            let newObj = {}
            newObj.id = expense.Recipient.id
            newObj.amount = expense.amount
            newObj.first_name = expense.Recipient.first_name
            newObj.last_name = expense.Recipient.last_name
            // newObj[expense.Recipient.id] = expense.amount
            // newObj[expense.Recipient.first_name] =expense.Recipient.last_name
            othersOweYou.push(newObj)
        }
    }

    console.log(othersOweYou, 'othersOweYou-----------------------------------')

    let overlapping = []
    for (let expense of Object.values(allExpenses)){
        if (expense.Fronter.id === currentUser.id ) {
            let opposingPerson = overlapping.find(user => user.id === expense.Recipient.id)

            if (opposingPerson) {
                opposingPerson.amount += expense.amount
            }
            else{
                let newObj = {}
                newObj.id = expense.Recipient.id
                newObj.amount = expense.amount
                newObj.first_name = expense.Recipient.first_name
                newObj.last_name = expense.Recipient.last_name
                overlapping.push(newObj)
            }
        }
        //current User is not the fronter, so he owes others money
        else {
            let opposingPerson = overlapping.find(user => user.id === expense.Fronter.id)

            if(opposingPerson) {
                opposingPerson.amount -= expense.amount
            }
            else {
                let newObj = {}
                newObj.id = expense.Fronter.id
                newObj.amount = expense.amount * -1
                newObj.first_name = expense.Fronter.first_name
                newObj.last_name = expense.Fronter.last_name
                overlapping.push(newObj)
            }
        }
    }

    console.log(overlapping, 'overlapping --------------------------------')

    return (
        <div className='outer-container'>
            <div className='left-side'>
                <div className='left-empty-div'>
                </div>
                <div className='right-side-bar-div'>
                    <div className='active-side-bar'>
                        <div className='dashboard '><NavLink to="/dashboard">Dashboard</NavLink></div>
                        <div className='all-expenses '><NavLink to="/expenses/all">All Expenses</NavLink></div>
                        <div className='group '><GroupsSidebar /></div>
                        <div className='friends '><FriendSideBar /></div>
                    </div>
                </div>
            </div>
            <div className='middle-side'>
                <div className='title'>
                    <div className='dashboard-top-expenses'>
                        <h1 className='dashboard-header'>Dashboard</h1>
                        <CreateExpenseModal />
                    </div>
                    <div className='dashboard-values-total-expenses-container'>
                        <div className='dashboard-values-container'>
                            <div className='dashboard-values-labels'>total balance</div>
                            <div id='dashboard-values-balance'>${(totalLentOut.toFixed(2) - totalOwed.toFixed(2)).toFixed(2)}</div>
                        </div>
                        <div>
                            <div className='dashboard-values-labels'>you owe</div>
                            <div id='dashboard-values-owed'>${totalOwed.toFixed(2)}</div>
                        </div>
                        <div>
                            <div className='dashboard-values-labels'>you are owed</div>
                            <div id='dashboard-values-owe'>${totalLentOut.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='dashboard-content-total-container'>
                        <div className='you-owe-column-container'>
                            <div className='you-owe-are-owed-label'>YOU OWE</div>
                            <div className='net-amounts-disclaimer'>*Net amounts may not add up to dashboard value </div>
                            {overlapping.filter((expense) => expense.amount < 0).map((expense) => {
                                return (
                                    <div className='dashboard-each-user-container'>
                                        <i class="fa-solid fa-user"></i>
                                        <div className='dashboard-each-user-right-side'>
                                        <div className="dashboard-expense-name">{expense.first_name}&nbsp;{expense.last_name}</div>
                                        <div className='dashboard-you-owe-text'>you owe {(expense.amount * -1).toFixed(2)}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='you-are-owed-column-container'>
                            <div className='you-owe-are-owed-label'>YOU ARE OWED</div>
                            <div className='net-amounts-disclaimer'>*Net amounts may not add up to dashboard value </div>
                            {overlapping.filter((expense) => expense.amount > 0).map((expense) => {
                                return (
                                    <div className='dashboard-each-user-container'>
                                        <i class="fa-solid fa-user"></i>
                                        <div className='dashboard-each-user-right-side'>
                                        <div className='dashboard-expense-name'>{expense.first_name}&nbsp;{expense.last_name}</div>
                                        <div className='dashboard-you-are-owed-text'>owes you {expense.amount.toFixed(2)}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

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

export default Dashboard
