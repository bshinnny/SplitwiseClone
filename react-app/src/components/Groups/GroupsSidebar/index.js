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
            <div className='sidebar-heading-create'>
                <div className='sidebar-heading'>GROUPS</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink className='create-group-link' to={`/groups/new`}>
                    <div className='add-link'>+ add</div>
                </NavLink>
            </div>
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
