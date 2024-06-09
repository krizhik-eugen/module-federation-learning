import {App} from '@/components/App';
import { createBrowserRouter } from 'react-router-dom';
// @ts-ignore
import shopRoutes from 'shop/Router'
// @ts-ignore
import adminRoutes from 'admin/Router'

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            ...shopRoutes,
            ...adminRoutes
        ]
    },
]

export const router = createBrowserRouter(routes);