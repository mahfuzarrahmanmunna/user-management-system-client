import { createBrowserRouter } from "react-router";
import Roots from "../Layouts/Roots";
import Home from "../Components/Home";
import AddUser from "../Components/AddUser";
import Users from "../Components/Users";
import UpdateUser from "../Components/UpdateUser";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Roots,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/added-user',
                Component: AddUser
            },
            {
                path: '/users',
                Component: Users,
                loader: () => fetch(`https://user-management-system-server-lac.vercel.app/users/`),
                hydrateFallbackElement: <p>Loading...</p>
            },
            {
                path: 'updated-user/:id',
                Component: UpdateUser,
                loader: ({ params }) => fetch(`https://user-management-system-server-lac.vercel.app/users/${params.id}`)
            }
        ]
    }
])