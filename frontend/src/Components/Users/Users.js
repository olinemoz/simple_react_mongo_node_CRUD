import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([])
    const nameRef = useRef('')
    const history = useHistory()

    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(response => response.json())
            .then(data => setUsers(data))
    }, [])

    const handleAddUser = (event) => {
        const addedValue = nameRef.current.value
        const newUser = {
            name: addedValue
        }

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => {
                if (data.insertedId) {
                    alert('User Added Successfully')
                    event.target.reset()
                }
            })
        event.preventDefault();
    }
    const handleDeleteUser = id => {
        const proceed = window.confirm("Are you sure you want to delete this user ?")
        if (proceed) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('User has been Removed!')
                        const restUsers = users.filter(user => user._id !== id)
                        setUsers(restUsers)
                    }
                })
        }
    }

    const updateUser = (id) => {
        history.push(`/user/update/${id}`)
    }

    return (
        <div>
            <form onSubmit={handleAddUser} className="w-50 mx-auto">
                <input className="form-control" type="text" placeholder="Add User" ref={nameRef}/>
                <input className="btn btn-outline-primary btn-sm my-2" type="submit" value="Add User"/>
            </form>
            <br/>
            <h2>Users {users.length}</h2>
            {
                users.map(user => (
                    <div key={user._id} className="bg-success text-white w-25 mx-auto py-2 ps-3 mt-2 d-flex rounded">
                        <p>{user.name}</p>
                        <div className="ms-auto">
                            <button className='btn btn-primary btn-sm'
                                    onClick={() => updateUser(user._id)}>Update
                            </button>
                            <button className='btn btn-danger mx-2 btn-sm'
                                    onClick={() => handleDeleteUser(user._id)}>Delete
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Users;