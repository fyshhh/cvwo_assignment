import React from 'react';
import axios from 'axios';
import Header from './Header';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Task from './Task';
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

        const { match } = this.props;
        const taskId = match.params.id;
        const task = tasks.find(t => t.id === Number(taskId));

        return (
            <div>
                <Header />
                <TaskList tasks={tasks} />
                <PropsRoute path='/tasks/:id' component={Task} task={task} />
            </div>
        );
    }
}

Editor.propTypes = {
    match: PropTypes.shape()
};

Editor.defaultProps = {
    match: undefined
}