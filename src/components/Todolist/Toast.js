import classNames from 'classnames/bind';
import styles from './Todolist.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import './Toast_css.css';

const cx = classNames.bind(styles);

function Toast({todos, setTodos, id}) {

    const undo =() => {
        const findTodo = todos.find((todo) => todo.id === id);
        setTodos(prevSate => [...prevSate, findTodo]);
    }


    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Todo deleted !</span>
            <button onClick={undo}>Undo</button>
        </div>
    );
}

export default Toast;
