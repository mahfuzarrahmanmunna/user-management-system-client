import React from 'react';
import { Link, useLoaderData } from 'react-router';
import { Pencil, X } from 'lucide-react';

const Users = () => {
    const users = useLoaderData();
    // console.log(users);
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
                                        <button className='btn btn-sm btn-outline btn-info'>
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