import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])



    const handleUpdateUser = e => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedcount > 0) {
                    alert('updated successfully')
                    setUser({});
                }
            })


        e.preventDefault();
    }

    // update user

    // name
    const handleNameChange = e => {
        const updateName = e.target.value;
        const updateUser = { name: updateName, email: user.email };
        setUser(updateUser);
    }


    // email
    const handleEmailChange = e => {
        const updateEmail = e.target.value;
        const updateUser = { ...user };
        updateUser.email = updateEmail;
        setUser(updateUser);
    }
    // emailta just vinnovabe kora hoice namer systeme o kora jay


    return (
        <div>
            <h2>update userName: {user.name}</h2>

            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} value={user.name || ''} />
                <input type="text" onChange={handleEmailChange} value={user.email || ''} />
                <input type="submit" value="update" />
            </form>
        </div>
    );
};

export default UpdateUser;