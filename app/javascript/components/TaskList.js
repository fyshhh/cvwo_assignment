import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class TaskList extends React.Component {
    renderTasks() {
        const { tasks } = this.props;
        tasks.sort(
            (a, b) => a.id - b.id
        );

        return tasks.map(task => (
            <li key={task.id}>
                {task.date}
                {', '}
                {moment(task.time).format('hh:mmA')}
                {' - '}
                {task.name}
            </li>
        ))
    }

    render() {
        return (
            <section>
                <h2>Tasks</h2>
                <ul>{this.renderTasks()}</ul>
            </section>
        );
    }
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object)
};

TaskList.defaultProps = {
    tasks: []
};