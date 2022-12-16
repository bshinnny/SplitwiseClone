import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as groupActions from '../../../store/groups';
import './CreateGroupForm.css';

function CreateGroupForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [additionalEmails, setAdditionalEmails] = useState('')
    const [counter, setCounter] = useState(0);
    const [errors, setErrors] = useState([]);

    // console.log('TYPE IS:', type)

    const handleAddClick = (e) => {
        e.preventDefault();
        // console.log('ADD', counter)
        setCounter(counter + 1)
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
        // console.log('DELETE', counter)
        setCounter(counter - 1)
    }

    const handleOnChange = (e) => {
        const emailArr = [];
        emailArr.push(e.target.value);
        setAdditionalEmails([...additionalEmails, ...emailArr])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = [];

        if (name.length > 49) errors.push('Name must be less than 50 characters.');
        if (type !== 'Home' && type !== 'Trip' && type !== 'Couple' && type !== 'Other') errors.push('Please select one of the following types.');
        // for (const )
        // if (memberEmail.length > 254) errors.push('Email must be less than 255 characters.')

        setErrors(errors);

        if (errors.length) {
            console.log(errors)
            return;
        }

        // console.log('ADDITIONAL EMAILS', additionalEmails)

        const newGroup = {
            // memberEmail,
            name,
            type,
            // additionalEmails
        };

        return dispatch(groupActions.createAGroupThunk(newGroup))
            .then((group) => {
                setName('')
                setType('')
                // setMemberEmail('')
                history.push(`/groups/${group.id}/members/add`);
            })
    };

    return (
        <div className='create-group-form-div'>
            <form className='create-group-form' onSubmit={handleSubmit}>
                <h2>START A NEW GROUP</h2>
                <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div>My group shall be called...</div>
                <div className='grp-form-container'>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Group Name'
                        required
                        className='input'
                    />
                </div>
                <div className='grp-form-container'>
                    <select
                        name='groupType'
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    >
                        <option value='' disabled>
                            Select a Group Type...
                        </option>
                        <option value='Home'>Home</option>
                        <option value='Trip'>Trip</option>
                        <option value='Couple'>Couple</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
                {/* <label>
                    <input
                        type='email'
                        onChange={(e) => setMemberEmail(e.target.value)}
                        value={memberEmail}
                        placeholder='Member Email'
                        required
                        className='input'
                    />
                </label>
                {[...Array(counter).keys()].map((num) => {
                    console.log('RENDER', additionalEmails)
                    return (
                        <div key={`additional-email-${num}`}>
                            <input
                                type='email'
                                // onChange={(e) => {
                                //     const emailsArr = [];
                                //     emailsArr.push(e.target.value)
                                //     setAdditionalEmails(emailsArr)
                                // }}
                                onSubmit={handleOnChange}
                                key={`additional-email-${num}`}
                                // value={`additionalEmail-${num}`}
                                placeholder='Additional Member Email'
                                required
                                className='input'
                            />
                            <button onClick={handleDeleteClick}>X</button>
                        </div>
                    )
                })}
                <button onClick={handleAddClick}>Add additional member.</button> */}
                <button className='submit-button' type='submit'>Submit New Group</button>
            </form>
        </div>
    )
}

export default CreateGroupForm;
