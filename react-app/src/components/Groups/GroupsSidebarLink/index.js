// import { useState, useEffect } from 'react';
// import * as groupActions from '../../../store/groups';
// import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

function GroupsSidebarLink({ group }) {
    // const dispatch = useDispatch();

    return (
        <div className='group-link-div'>
            <NavLink className='group-link' to={`/groups/${group.id}`} key={group.id} >
                <p>{group.name}</p>
            </NavLink>
        </div>
    )

}

export default GroupsSidebarLink
