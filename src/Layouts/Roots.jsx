import React from 'react';
import { Outlet } from 'react-router';
import Headers from '../Components/Headers';

const Roots = () => {
    return (
        <div>
            <Headers />
            <div className='max-w-7xl mx-auto py-12'>
                <Outlet />
            </div>
        </div>
    );
};

export default Roots;