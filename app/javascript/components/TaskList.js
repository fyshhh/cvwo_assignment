import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class TaskList extends React.Component {
    renderTasks() {
        const { tasks } = this.props;
        tasks.sort(
            (a, b) => a.id - b.id
        );

        return tasks.map(task => (
            <li key={task.id}>
                <Link to={`/tasks/${task.id}`}>
                    {task.date}
                    {', '}
                    {moment(task.time).subtract(8, 'hours').format('hh:mmA')}
                    {' - '}
                    {task.name}
                </Link>
            </li>
        ));
    }

    render() {
        return (
            <section>
                <div className="row">
                    <h2 className="col">Tasks</h2>
                    <div className="col">
                        <Link to="/tasks/new">
                            <button class="btn btn-primary">
                                New Task
                            </button>
                        </Link>
                    </div>
                </div>
                <ul className="row">{this.renderTasks()}</ul>
            </section>
        );
    }
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object)
};

TaskList.defaultProps = {
    tasks: []
};