import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmptyObject, validateTask } from "../helpers/helpers";

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
                <h3>The following errors prohibited the task from being saved:</h3>
                <ul>
                    {Object.values(errors).map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        );
    }

    handleInputChange(task) {
        const { target } = task;
        const { name } = target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState(prevState => ({
            task: {
                ...prevState.task,
                [name]: value,
            },
        }));
    }

    componentWillReceiveProps({ task }) {
        this.setState({ task });
    }

    render() {
        const { task } = this.state;
        const cancelURL = task.id ? `/tasks/${task.id}` : '/tasks';
        const title = task.id ? task.name : 'New Task';

        return (
            <div>
                <h3>{title}</h3>
                {this.renderErrors()}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">
                            <strong>Name:</strong>
                            <input
                                type="text"
                                name="name"
                                onChange={this.handleInputChange}
                                value={task.name}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="description">
                            <strong>Description:</strong>
                            <textarea
                                // cols="30"
                                // rows="10"
                                className="form-control"
                                name="description"
                                onChange={this.handleInputChange}
                                value={task.description}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="date">
                            <strong>Date:</strong>
                            <input
                                type="date"
                                name="date"
                                onChange={this.handleInputChange}
                                value={task.date}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="time">
                            <strong>Time:</strong>
                            <input
                                type="time"
                                name="time"
                                onChange={this.handleInputChange}
                                value={task.time}
                            />
                        </label>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Save</button>
                        <Link to={cancelURL}><button>Cancel</button></Link>
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
