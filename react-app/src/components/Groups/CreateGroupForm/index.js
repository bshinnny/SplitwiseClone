import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as groupActions from '../../../store/groups';

function CreateGroupForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [errors, setErrors] = useState('');

    // console.log('TYPE IS:', type)

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = [];

        if (name.length > 49) errors.push('Name must be less than 50 characters.');
        if (type !== 'Home' && type !== 'Trip' && type !== 'Couple' && type !== 'Other') errors.push('Please select one of the following types.');
        if (memberEmail > 254) errors.push('Email must be less than 255 characters.')

        setErrors(errors);

        if (errors.length) {
            console.log(errors)
            return;
        }

        const newGroup = {
            name,
            type
        };

        return dispatch(groupActions.createAGroupThunk(newGroup))
            .then((group) => {
                setName('')
                setType('')
                setMemberEmail('')
                history.push(`/groups/${group.id}`);
            })
    };

    return (
        <div className='create-group-form-div'>
            <form className='create-group-form' onSubmit={handleSubmit}>
                <h2>START A NEW GROUP</h2>
                <h3>My group shall be called...</h3>
                {/* <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> */}
                <label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Group Name'
                        required
                        className='input'
                    />
                </label>
                <label>
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
                </label>
                {/* <label>
                    <input
                        type='email'
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value).then(dispatch())}
                        placeholder='Member Email'
                        required
                        className='input'
                    />
                </label> */}
                <button className='submit-button clickable' type='submit'>Submit New Group</button>
            </form>
        </div>
    )
}

export default CreateGroupForm;
