import { useEffect } from 'react';
import * as groupActions from '../../../store/groups';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import GroupsSidebar from '../GroupsSidebar';
import './GroupDetails.css'

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
        history.push(`/expenses/all`);
    }

    const dispatchEdit = (e) => {
        e.preventDefault();
        history.push(`/groups/${groupId}/edit`);
    }

    const dispatchAdd = (e) => {
        e.preventDefault();
        history.push(`/groups/${groupId}/members/add`);
    }


    const members = useSelector(state => state.groups.groupMembers)
    const expenses = useSelector(state => state.groups.groupExpenses)
    const group = useSelector(state => state.groups.groupDetails)
    const user = useSelector(state => state.session.user)

    // console.log(members)
    // console.log(expenses)

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
                    {group.type === 'Home' && (<h2 className='group-header'><i class="fa-solid fa-house-user"></i> {group.name} </h2>)}
                    {group.type === 'Trip' && (<h2 className='group-header'><i class="fa-solid fa-plane-departure"></i> {group.name}</h2>)}
                    {group.type === 'Couple' && (<h2 className='group-header'><i class="fa-solid fa-user-group"></i> {group.name}</h2>)}
                    {group.type === 'Other' && (<h2 className='group-header'><i class="fa-solid fa-star"></i> {group.name}</h2>)}
                </div>
                <div className='content'>
                <div className='group-expenses-div'>
                {/* <h2>Group Expenses</h2> */}
                {Object.values(expenses).map((expense) => {
                    if (user.id === expense.user_id) {
                        return (
                            <div key={`group-expense-${expense.id}`}>
                                <div className='group-expense'>
                                    <div className='group-expense-name'>{expense.description}</div>
                                    <div className='exp-amt-rec'>
                                        <div className='group-expense-recipient'>
                                            {`You lent ${expense.Recipient.first_name}`}
                                        </div>
                                        <div className='group-expense-amount-frt'>
                                            {`$${expense.amount}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={`group-expense-${expense.id}`}>
                                <div className='group-expense'>
                                    <div className='group-expense-name'>{expense.description}</div>
                                    <div className='exp-amt-rec'>
                                        <div className='group-expense-recipient'>
                                            {`${expense.Fronter.first_name} lent you`}
                                        </div>
                                        <div className='group-expense-amount-rec'>
                                            {`$${expense.amount}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
                </div>
            </div>
            <div className='right-side'>
                <div className='left-with-info'>
                    <div className='group-settings'>
                        <button className='group-button-clickable' onClick={dispatchEdit}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button className='group-button-clickable' onClick={dispatchDelete}><i className="fa-solid fa-trash"></i></button>
                        <button className='group-button-clickable' onClick={dispatchAdd}><i className="fa-solid fa-plus"></i></button>
                    </div>
                <div className='group-members-div'>
                <h2 className='group-header'>Members</h2>
                {Object.values(members).map((member) => {
                    return (
                        <div className='member-name-div'>
                            <i className="fa-solid fa-user"></i>
                            <div key={`member-${member.id}`} className='member-name'>{member.first_name} {member.last_name}</div>
                        </div>
                    )
                })}
            </div>
                </div>
                <div className='right-empty'>
                    <p>right-empty</p>
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;
