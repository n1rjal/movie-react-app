import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';

import Header from './components/header/header';
import './App.css';
import DetailView from './components/body/detailview';

const App = () => (


    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/:id" component={DetailView} />
                <Route exact path="/" component={Header} />
            </Switch>

        </div >
    </BrowserRouter>
);

export default App;
