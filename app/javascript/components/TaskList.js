import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        };

        this.searchInput = React.createRef();
        this.updateSearchTerm = this.updateSearchTerm.bind(this);
    }

    updateSearchTerm() {
        this.setState({ searchTerm: this.searchInput.current.value });
    }

    renderTasks() {
        const { activeId, tasks } = this.props;
        const filteredTasks = tasks
            .filter(tl => this.matchSearchTerm(tl))
            .sort((a, b) => a.id - b.id);

        tasks.sort(
            (a, b) => a.id - b.id
        );

        return filteredTasks.map(task => (
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

    matchSearchTerm(obj) {
        const {
            id, published, created_at, updated_at, ...rest
        } = obj;
        const { searchTerm } = this.state;

        return Object.values(rest).some(
            value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
        );
    }

    render() {
        return (
            <section>
                <div className="row">
                    <h2 className="col">Tasks</h2>
                    <div className="col">
                        <Link to="/tasks/new">
                            <button className="btn btn-success">
                                New Task
                            </button>
                        </Link>
                    </div>
                </div>
                <input
                    className="search"
                    placeholder="Search"
                    type="text"
                    ref={this.searchInput}
                    onKeyUp={this.updateSearchTerm}
                />
                <ul className="row">{this.renderTasks()}</ul>
            </section>
        );
    }
};

TaskList.propTypes = {
    activeId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object)
};

TaskList.defaultProps = {
    activeId: undefined,
    tasks: []
};