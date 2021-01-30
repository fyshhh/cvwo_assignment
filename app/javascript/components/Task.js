import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import TaskNotFound from "./TaskNotFound";
import { timeFormats } from '../helpers/helpers';

const Task = ({ task, onDelete }) => {
    if (!task) return <TaskNotFound />;

    return (
        <div>
            <div className="row">
                <h3 className="col-9">
                    {task.name}
                </h3>
                <div className="col-1">
                    <Link to={`/tasks/${task.id}/edit`}>
                        <button className="btn btn-warning">
                            Edit
                        </button>
                    </Link>
                </div>
                <div className="col-1">
                    <button className="delete btn btn-danger" type="button" onClick={() => onDelete(task.id)}>
                        Delete
                    </button>
                </div>
            </div>
            <br />
            <ul>
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
                    {moment(task.time, 'HH:mm').format('hh:mmA')}
                </li>
            </ul>
        </div>
    );
}


Task.propTypes = {
    task: PropTypes.shape(),
    onDelete: PropTypes.func.isRequired
};

Task.defaultProps = {
    task: undefined
};

export default Task;