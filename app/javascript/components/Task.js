import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

const Task = ({ task }) => (
    <div>
        <h2>
            {task.date}
            {', '}
            {moment(task.time).format('hh:mmA')}
        </h2>
        <ul>
            <li>
                <strong>Name: </strong>
                {task.name}
            </li>
            <li>
                <strong>Description: </strong>
                {task.description}
            </li>
            <li>
                <strong>Date: </strong>
                {task.date}
            </li>
            <li>
                <strong>Time: </strong>
                {moment(task.time).format('hh:mmA')}
            </li>
        </ul>
    </div>
);

Task.propTypes = {
    task: PropTypes.shape()
};

Task.defaultProps = {
    task: undefined
};

export default Task;