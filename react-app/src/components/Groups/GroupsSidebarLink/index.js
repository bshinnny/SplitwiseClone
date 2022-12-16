// import { useState, useEffect } from 'react';
// import * as groupActions from '../../../store/groups';
// import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './GroupsSidebarLink.css';

function GroupsSidebarLink({ group }) {
    // const dispatch = useDispatch();

    return (
        <div className='group-link-div'>
            <NavLink className='group-link' to={`/groups/${group.id}`} key={group.id} >
                <i className="fa-solid fa-tag"></i> &nbsp;
                <p className='navlink-text'>{group.name}</p>
            </NavLink>
        </div>
    )

}

export default GroupsSidebarLink
