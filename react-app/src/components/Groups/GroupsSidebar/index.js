import { useEffect } from 'react';
// import { useState } from 'react';
import * as groupActions from '../../../store/groups';
import { useDispatch, useSelector } from 'react-redux';
import GroupsSidebarLink from '../GroupsSidebarLink';
import { NavLink } from 'react-router-dom';
import './GroupsSidebar.css';


function GroupsSidebar() {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.userGroups);
    // console.log(groups)

    useEffect(() => {
        dispatch(groupActions.getUserGroupsThunk())
    }, [dispatch])

    return (
        <div className='groups-sidebar-div'>
            <h2>Groups</h2>
            <NavLink className='create-group-link' to={`/groups/new`}>
                <p>Create a new group!</p>
            </NavLink>
            <div className='groups-sidebar-link'>
                {Object.values(groups).map((group) => {
                    return (
                        <GroupsSidebarLink key={`group-${group.id}`} group={ group }/>
                    )
                })}
            </div>

        </div>
    )
}

export default GroupsSidebar
