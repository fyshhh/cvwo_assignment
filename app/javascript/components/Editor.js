import React from 'react';
import axios from 'axios';
import Header from './Header';
import TaskList from './TaskList';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: null,
        };
    }

    componentDidMount() {
        axios
            .get('/api/tasks.json')
            .then(response => this.setState({ tasks: response.data }))
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { tasks } = this.state;
        if (tasks === null) return null;

        return (
            <div>
                <Header />
                <TaskList tasks={tasks} />
            </div>
        );
    }
}
