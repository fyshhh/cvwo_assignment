import React from 'react';
import PropTypes from 'prop-types';

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
        const errors = this.validateTask(task);
        if (!this.isEmptyObject(errors)) {
            this.setState({ errors });
        } else {
            console.log(task);
        }
    }

    renderErrors() {
        const { errors } = this.state;

        if (this.isEmptyObject(errors)) {
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

    validateTask(task) {
        const errors = {};

        if (task.name === '') {
            errors.name = 'You must enter a name for your task.';
        }

        if (task.description === '') {
            errors.description = 'You must enter a description for your task.';
        }

        if (task.date === '') {
            errors.date = 'You must enter a valid date.';
        }

        console.log(task);
        return errors;
    }

    isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
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

    render() {
        return (
            <div>
                <h2>New Task</h2>
                {this.renderErrors()}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">
                            <strong>Name:</strong>
                            <input type="text" name="name" onChange={this.handleInputChange} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="description">
                            <strong>Description:</strong>
                            <textarea cols="30" rows="10" name="description" onChange={this.handleInputChange} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="date">
                            <strong>Date:</strong>
                            <input type="date" name="date" onChange={this.handleInputChange} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="time">
                            <strong>Time:</strong>
                            <input type="time" name="time" onChange={this.handleInputChange} />
                        </label>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

TaskForm.propTypes = {
    task: PropTypes.shape()
}

TaskForm.defaultProps = {
    task: {
        name: '',
        description: '',
        date: '',
        time: ''
    }
}
