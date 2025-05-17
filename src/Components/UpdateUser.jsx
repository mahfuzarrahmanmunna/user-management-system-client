import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateUser = () => {
    const { _id, name, email, gender: initialGender, active: initialActive } = useLoaderData();

    const [gender, setGender] = useState(initialGender || 'Female');
    const [active, setActive] = useState(initialActive || 'Active');

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { name, email } = Object.fromEntries(formData.entries());
        const updatedUser = { name, email, gender, active };

        fetch(`http://localhost:3000/users/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'User updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div className='bg-base-200 rounded-2xl shadow'>
            <div className='text-center py-8'>
                <h1 className='text-2xl font-bold'>Update User</h1>
                <p className='text-gray-500'>Use the form below to update user details</p>
            </div>
            <div>
                <form onSubmit={handleUpdateUser} className='lg:px-24 px-6 pb-12'>
                    {/* Name Field */}
                    <fieldset className='fieldset rounded-box w-full p-4'>
                        <label className='label'>Name</label>
                        <input type='text' name='name' defaultValue={name} className='input w-full' placeholder='Name' />
                    </fieldset>

                    {/* Email Field */}
                    <fieldset className='fieldset rounded-box w-full p-4'>
                        <label className='label'>Email</label>
                        <input type='email' name='email' defaultValue={email} className='input w-full' placeholder='Email' />
                    </fieldset>

                    {/* Gender Field */}
                    <fieldset className='p-4'>
                        <label className='label'>Gender</label>
                        <div className='flex items-center gap-6 mt-2'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='Male'
                                    checked={gender === 'Male'}
                                    onChange={(e) => setGender(e.target.value)}
                                    className='radio radio-info'
                                />
                                Male
                            </label>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='Female'
                                    checked={gender === 'Female'}
                                    onChange={(e) => setGender(e.target.value)}
                                    className='radio radio-info'
                                />
                                Female
                            </label>
                        </div>
                    </fieldset>

                    {/* Status Field */}
                    <fieldset className='p-4'>
                        <label className='label'>Status</label>
                        <div className='flex items-center gap-6 mt-2'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='radio'
                                    name='status'
                                    value='Active'
                                    checked={active === 'Active'}
                                    onChange={(e) => setActive(e.target.value)}
                                    className='radio radio-info'
                                />
                                Active
                            </label>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='radio'
                                    name='status'
                                    value='Inactive'
                                    checked={active === 'Inactive'}
                                    onChange={(e) => setActive(e.target.value)}
                                    className='radio radio-info'
                                />
                                Inactive
                            </label>
                        </div>
                    </fieldset>

                    {/* Submit */}
                    <input type='submit' value='Update User' className='btn btn-block btn-outline btn-info mt-6' />
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
