import react from 'react';
import {Switch,BrowserRouter,Route} from 'react-router-dom';
import Home from './core/Home';

export default function Routes()
{
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
        </Switch>
        </BrowserRouter>
    );
}