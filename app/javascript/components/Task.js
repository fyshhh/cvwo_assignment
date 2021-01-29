import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import TaskNotFound from "./TaskNotFound";

const Task = ({ task, onDelete }) => {
    if (!task) return <TaskNotFound />;

    return (
        <div>
            <div className="row">
                <h4 className="col-8">
                    {task.date}
                    {', '}
                    {moment(task.time).subtract(8, 'hours').format('hh:mmA')}
                </h4>
                <div className="col">
                    <Link to={`/tasks/${task.id}/edit`}>
                        <button className="btn btn-primary">
                            Edit Task
                        </button>
                    </Link>
                </div>
                <div className="col-2">
                    <button className="delete btn btn-danger" type="button" onClick={() => onDelete(task.id)}>
                        Delete Task
                    </button>
                </div>
            </div>
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
                    {moment(task.time).subtract(8, 'hours').format('hh:mmA')}
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