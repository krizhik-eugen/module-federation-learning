import {App} from '@/components/App';
import {Suspense} from 'react';
import {About} from '@/pages/about';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/admin/about',
                element: <Suspense fallback={'Loading...'}><About/></Suspense>
                // element: <About/>
            },
        ]
    },
]

export const router = createBrowserRouter(routes);

export default routes;