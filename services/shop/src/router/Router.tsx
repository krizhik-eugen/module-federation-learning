import {App} from '@/components/App';
import {Suspense} from 'react';
import {Shop} from '@/pages/shop';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/shop/main',
                element: <Suspense fallback={'Loading...'}><Shop/></Suspense>
                // element: <Shop/>
            },
            {
                path: '/shop/second',
                element: <Suspense fallback={'Loading...'}><div style={{color: 'red'}}>Second Shop page</div></Suspense>
            }
        ]
    },
]

export const router = createBrowserRouter(routes);

export default routes