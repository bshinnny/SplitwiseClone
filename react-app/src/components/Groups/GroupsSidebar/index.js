import { useEffect } from 'react';
// import { useState } from 'react';
import * as groupActions from '../../../store/groups';
import { useDispatch, useSelector } from 'react-redux';
import GroupsSidebarLink from '../GroupsSidebarLink';


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
