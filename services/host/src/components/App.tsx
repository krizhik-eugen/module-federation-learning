import { Link, Outlet } from 'react-router-dom';

export const App = () => {

    return (
        <div>
            <h1>Hello world!!! new Project</h1>
            <Link to='/about'>About</Link>
            <br/>
            <Link to='/shop/main'>Shop</Link>
            <Outlet/>
        </div>
    );
};
