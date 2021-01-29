import React from 'react';
import { Route } from 'react-router-dom';
import { Alert } from '../helpers/notifications';
import Editor from './Editor';

const App = () => (
    <div>
        <Route path='/tasks/:id?' component={Editor} />
        <Alert stack={ { limit: 3 } } />
    </div>
);

export default App;