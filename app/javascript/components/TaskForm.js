import React from 'react';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('form submitted');
    }

    render() {
        return (
            <div>
                <h2>New Task</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">
                            <strong>Name:</strong>
                            <input type="text" name="name" />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="description">
                            <strong>Description:</strong>
                            <textarea cols="30" rows="10" name="description" />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="date">
                            <strong>Date:</strong>
                            <input type="date" name="date" />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="time">
                            <strong>Time:</strong>
                            <input type="time" name="time" />
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