import React from 'react';
import axios from 'axios';
import Header from './Header';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Task from './Task';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Switch } from 'react-router-dom';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: null,
        };
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount() {
        axios
            .get('/api/tasks.json')
            .then(response => this.setState({ tasks: response.data }))
            .catch((error) => {
                console.log(error);
            });
    }

    addTask(newTask) {
        axios
            .post('/api/tasks.json', newTask)
            .then((response) => {
                alert('Task added!');
                const savedTask = response.data;
                this.setState(prevState => ({
                    tasks: [...prevState.tasks, savedTask],
                }));
                const { history } = this.props;
                history.push(`/tasks/${savedTask.id}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteTask(taskId) {
        const bool = window.confirm('Are you sure you want to delete this event?');
        if (bool) {
            axios
                .delete(`/api/tasks/${taskId}.json`)
                .then((response) => {
                    if (response.status === 204) {
                        alert('Task deleted!');
                        const { history } = this.props;
                        history.push('/tasks');

                        const { tasks } = this.state;
                        this.setState({ tasks: tasks.filter(task => task.id !== taskId) });
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    render() {
        const { tasks } = this.state;
        if (tasks === null) return null;

        const { match } = this.props;
        const taskId = match.params.id;
        const task = tasks.find(t => t.id === Number(taskId));

        return (
            <div className="container-fluid">
                <Header />
                <div className="row">
                    <div className="col-4">
                        <TaskList tasks={tasks} />
                    </div>
                    <div className="col-8">
                        <Switch>
                            <PropsRoute path='/tasks/new' component={TaskForm} onSubmit={this.addTask}/>
                            <PropsRoute path='/tasks/:id' component={Task} task={task} onDelete={this.deleteTask}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    match: PropTypes.shape(),
    history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

Editor.defaultProps = {
    match: undefined
}