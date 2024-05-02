import classNames from 'classnames/bind';
import styles from './Inbox.module.scss';
import Header from '~/pages/components/Header';
import TodoList from '../../components/Todolist/Todolist';

const cx = classNames.bind(styles);

function Inbox({todos, setTodos, addTaskOpen, setAddTaskOpen, editTodo, setEditTodo}) {

    return (
        <div className={cx('wrapper')}>
            <Header title="Inbox" className={cx('header')} />
            <div className={cx('content')}>
                <TodoList 
                    todos={todos} 
                    setTodos={setTodos}
                    addTaskOpen={addTaskOpen}
                    setAddTaskOpen={setAddTaskOpen}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}
                     />
            </div>
        </div>
    );
}

export default Inbox;
