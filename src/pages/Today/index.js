import classNames from 'classnames/bind';
import styles from './Today.module.scss';

import Header from '~/pages/components/Header';
import TodoList from '../../components/Todolist/Todolist';

const cx = classNames.bind(styles);

function Today({ todos, setTodos, addTaskOpen, setAddTaskOpen, editTodo, setEditTodo, todayList, setTodayList }) {
    return (
        <div className={cx('wrapper')}>
            <Header title="Today" className={cx('header')} />
            <div className={cx('content')}>
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    addTaskOpen={addTaskOpen}
                    setAddTaskOpen={setAddTaskOpen}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}
                    today
                    todayList={todayList}
                    setTodayList={setTodayList}    />
                {/* <h1>today</h1> */}
            </div>
        </div>
    );
}

export default Today;
