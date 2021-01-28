import React from 'react';
import { Route } from 'react-router-dom';
import Editor from './Editor';

const App = () => (
    <div>
        <Route path='/tasks/:id?' component={Editor} />
    </div>
);

export default App;