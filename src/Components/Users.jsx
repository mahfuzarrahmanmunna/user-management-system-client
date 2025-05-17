import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { Pencil, X } from 'lucide-react';
import Swal from 'sweetalert2';

const Users = () => {
    const initialUsers = useLoaderData();
    const [users, setUsers] = useState(initialUsers)
    // console.log(users);

    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://user-management-system-server-lac.vercel.app/users/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            console.log('after delete the data from database', data);
                            // remove the data here
                            const remainingUsers = users.filter(prev => prev._id !== id)
                            setUsers(remainingUsers)
                        }
                    })

            }
        });
    }
    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.active}</td>
                                    <td className='flex gap-2'>
                                        <Link to={`/updated-user/${user._id}`} className='btn btn-sm btn-outline btn-info'>
                                            <Pencil size={20} />
                                        </Link>
                                        <button onClick={() => handleDelete(user._id)} className='btn btn-sm btn-outline btn-info'>
                                            <X size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;