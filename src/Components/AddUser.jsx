import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddUser = () => {
    const [gender, setGender] = useState("");
    const [active, setActive] = useState("");
    const handleAddUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { name, email } = Object.fromEntries(formData.entries())
        const newUser = { name, email, gender, active }
        console.log(newUser);
        console.log(name, email);
        alert(`Selected gender: ${gender}`);
        alert(`Selected gender: ${active}`);

        // give the data into database here
        fetch('https://user-management-system-server-lac.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log('after save the data into database', data);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })
    };
    return (
        <div className='bg-base-200 rounded-2xl shadow'>
            <div className='text-center py-8'>
                <h1 className='text-2xl font-bold'>New User</h1>
                <p className='text-gray-500'>
                    Use the below form to create a new account
                </p>
            </div>
            <div>
                <form onSubmit={handleAddUser} className='lg:px-24 px-6
                pb-12'>
                    {/* name fieldset */}
                    <fieldset className="fieldset rounded-box w-full p-4">
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input w-full" placeholder="Name" />
                    </fieldset>
                    {/* email fieldset */}
                    <fieldset className="fieldset rounded-box w-full p-4">
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input w-full" placeholder="Email" />
                    </fieldset>
                    {/* Gender */}
                    <fieldset className='p-4'>
                        <label className="label">Gender</label>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            defaultValue="Male"
                            checked={gender === 'Male'}
                            onChange={(e) => setGender(e.target.value)}
                            className="radio radio-info mr-2 ms-6"
                        />
                        <label htmlFor="male" className="text-gray-700 cursor-pointer">Male</label>
                        {/* female */}
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}
                            defaultValue="Female"
                            checked={gender === 'Female'}
                            className="radio radio-info mr-2 ms-6"
                        />
                        <label htmlFor="female" className="text-gray-700 cursor-pointer">Female</label><br />
                    </fieldset>
                    {/* Status */}
                    <fieldset className='p-4'>
                        <label className="label">Status</label>
                        <input
                            type="radio"
                            id="active"
                            name="status"
                            defaultValue="Active"
                            checked={active === 'Active'}
                            onChange={(e) => setActive(e.target.value)}
                            className="radio radio-info mr-2 ms-6 "
                        />
                        <label htmlFor="active" className="text-gray-700 cursor-pointer">Active</label>
                        {/* female */}
                        <input
                            type="radio"
                            id="inactive"
                            name="status"
                            onChange={(e) => setActive(e.target.value)}
                            defaultValue="Inactive"
                            checked={active === 'Inactive'}
                            className="radio radio-info mr-2 ms-6"
                        />
                        <label htmlFor="inactive" className="text-gray-700 cursor-pointer">Inactive</label><br />
                    </fieldset>
                    <input type="submit" value="Add User" className='btn btn-block btn-outline btn-info ' />
                </form>
            </div>
        </div>
    );
};

export default AddUser;