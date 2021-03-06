import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmptyObject, validateTask } from "../helpers/helpers";
import TaskNotFound from "./TaskNotFound";

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task: props.task,
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(t) {
        t.preventDefault();
        const { task } = this.state;
        const errors = validateTask(task);

        this.setState({ errors });
        if (isEmptyObject(errors)) {
            const { onSubmit } = this.props;
            onSubmit(task);
        }
    }

    renderErrors() {
        const { errors } = this.state;

        if (isEmptyObject(errors)) {
            return null;
        }

        return (
            <div className="errors">
                <h5>The following errors prohibited the task from being saved:</h5>
                <ul>
                    {Object.values(errors).map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        );
    }

    updateTask(key, value) {
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                [key]: value
            }
        }));
    }

    handleInputChange(task) {
        const { target } = task;
        const { name } = target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.updateTask(name, value)
    }

    componentWillReceiveProps({ task }) {
        this.setState({ task });
    }

    render() {
        const { task } = this.state;
        const { path } = this.props;

        if (!task.id && path === '/tasks/:id/edit') return <TaskNotFound />;

        const cancelURL = task.id ? `/tasks/${task.id}` : '/tasks';
        const title = task.id ? task.name : 'New Task';

        return (
            <div>
                <h3>{title}</h3>
                {this.renderErrors()}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-floating">
                        <strong>Name:</strong>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={this.handleInputChange}
                            value={task.name}
                        />
                    </div>
                    <br />
                    <div>
                        <strong>Description:</strong>
                        <textarea
                            rows="8"
                            className="form-control"
                            name="description"
                            onChange={this.handleInputChange}
                            value={task.description}
                        />
                    </div>
                    <br />
                    <div>
                        <strong>Date:</strong>
                        <br />
                        <input
                            type="date"
                            name="date"
                            onChange={this.handleInputChange}
                            value={task.date}
                        />
                    </div>
                    <br />
                    <div>
                        <strong>Time:</strong>
                        <br />
                        <input
                            type="time"
                            name="time"
                            onChange={this.handleInputChange}
                            value={task.time}
                        />
                    </div>
                    <br />
                    <div className="form-actions">
                        <button type="submit" className="btn btn-success mr-2">Save</button>
                        <Link to={cancelURL}><button className="btn btn-danger">Cancel</button></Link>
                    </div>
                </form>
            </div>
        );
    }
}

TaskForm.propTypes = {
    task: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired
}

TaskForm.defaultProps = {
    task: {
        name: '',
        description: '',
        date: '',
        time: ''
    }
}
