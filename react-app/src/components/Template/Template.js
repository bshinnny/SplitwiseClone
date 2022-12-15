import React from 'react'
import GroupsSidebar from '../Groups/GroupsSidebar'
import "./Template.css"

const Template = () => {
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
                    <div className='all-expenses'>all expenses</div>
                    <div className='group'><GroupsSidebar/></div>
                    <div className='friends'>friends</div>
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
