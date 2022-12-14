import { useEffect } from 'react';
import * as groupActions from '../../../store/groups';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import GroupsSidebar from '../GroupsSidebar';

function GroupDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();

    useEffect(() => {
        dispatch(groupActions.getGroupMembersThunk(groupId))
    }, [dispatch, groupId])

    useEffect(() => {
        dispatch(groupActions.getGroupExpensesThunk(groupId))
    }, [dispatch, groupId])

    useEffect(() => {
        dispatch(groupActions.getGroupDetailsThunk(groupId))
    }, [dispatch, groupId])

    const dispatchDelete = (e) => {
        e.preventDefault();
        dispatch(groupActions.deleteAGroupThunk(groupId));
        history.push(`/groups/current`)
    }


    const members = useSelector(state => state.groups.groupMembers)
    const expenses = useSelector(state => state.groups.groupExpenses)
    const group = useSelector(state => state.groups.groupDetails)
    const user = useSelector(state => state.session.user)

    // console.log(members)
    // console.log(expenses)

    return (
        <div className='group-details-div'>
            <GroupsSidebar />
            <h1>{group.name}</h1>
            <div className='group-members-div'>
                <h2>Group Members</h2>
                {Object.values(members).map((member) => {
                    return (
                        <div key={`member-${member.id}`}>{member.first_name}</div>
                    )
                })}
            </div>
            <div className='group-expenses-div'>
                <h2>Group Expenses</h2>
                {Object.values(expenses).map((expense) => {
                    if (user.id === expense.user_id) {
                        return (
                            <div key={`group-expense-${expense.id}`}>
                                <div className='group-expense'>
                                    <div className='group-expense-recipient'>
                                        {`You lent ${expense.Recipient.first_name}:`}
                                    </div>
                                    <div className='group-expense-amount'>
                                        {`$${expense.amount}`}
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={`group-expense-${expense.id}`}>
                                <div className='group-expense'>
                                    <div className='group-expense-recipient'>
                                        {`${expense.Fronter.first_name} lent you:`}
                                    </div>
                                    <div className='group-expense-amount'>
                                        {`$${expense.amount}`}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <button className='button clickable' onClick={dispatchDelete}>Delete <i className="fa-solid fa-trash"></i></button>
        </div>
    )
}

export default GroupDetails
