import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const UpdateUser = () => {
    const [user, setUser] = useState({})
    const {id} = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
    }, [id])

    const handleUpdateName = e => {
        const updatedName = e.target.value;
        setUser({
            ...user,
            name: updatedName
        })
    }
    const handleUpdateUser = event => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data.modifiedCount) {
                    alert('User has been updated')
                }
            })
        event.preventDefault()
    }

    return (
        <div className="mt-5 shadow-lg rounded p-4 w-50 mx-auto">
            <h5> User ID: {id}</h5>
            <h2>Name: {user.name}</h2>

            <form onSubmit={handleUpdateUser}>
                <div className="d-flex">
                    <input type="text"
                           className="form-control"
                           placeholder="Update Name"
                           name="updateName"
                           value={user.name || ''}
                           onChange={handleUpdateName}
                    />
                    <button type="submit" className="btn btn-sm btn-success ms-2">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;