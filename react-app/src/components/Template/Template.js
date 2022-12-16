import React from 'react'
import { NavLink } from 'react-router-dom'
import AllExpenses from '../AllExpenses'
import GroupsSidebar from '../Groups/GroupsSidebar'
import "./Template.css"
import FriendSideBar from '../friends/SideBar'

const Template = () => {
  return (
    <div className='outer-container'>
      <div className='left-side'>
            <div className='left-empty-div'>
            </div>
            <div className='right-side-bar-div'>
                <div className='active-side-bar'>
                    <div className='dashboard '>dashboard</div>
                    <div className='all-expenses '><NavLink to="/expenses/all">All Expenses</NavLink></div>
                    <div className='group '><GroupsSidebar/></div>
                    <div className='friends '><FriendSideBar/></div>
                </div>
            </div>
      </div>
      <div className='middle-side'>
            <div className='title'>
                <p>title</p>
            </div>
            <div className='content'>
                <p>content</p>
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

export default Template
