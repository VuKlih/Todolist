import dayjs from 'dayjs';
import React from 'react';
import Divider from '@mui/material/Divider';
import classNames from 'classnames/bind';
import styles from './Todolist.module.scss';
import { GoCircle } from 'react-icons/go';
import { BsCheckCircleFill } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import { PiCalendarBlankLight } from 'react-icons/pi';
import { MdDoneOutline } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';

import Toast from './Toast';

const cx = classNames.bind(styles);

const TodoList = ({ todos, setTodos, setEditTodo, setAddTaskOpen, today = false }) => {
    
    const handleDelete = ({ id }) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        toast(
            <Toast
                todos={todos}
                setTodos={setTodos}
                id={id} />
        )
    };

    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id) {
                    return {
                        ...item,
                        completed: !item.completed,
                        completedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    };
                }
                return item;
            }),
        );
    };

    const handleEdit = ({ id, completed }) => {
        if (completed === false) {
            const findTodo = todos.find((todo) => todo.id === id);
            setEditTodo(findTodo);
            setAddTaskOpen(true);
        }
    };

    const list = todos.filter((todo) => {
        return dayjs(todo.dueDate).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
    });

    let Comp = todos;
    if (today) {
        Comp = list;
    }

    Comp.sort((a, b) => {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        /* - a.completed === b.completed ? 0: If both a and b have the same completion status, the function returns 0, indicating that their relative order does not need to change.
           - a.completed ? 1 : -1: If the completion statuses are not the same, the function checks if a is completed.
                + If a.completed is true (meaning a is completed and b is not), the function returns 1, indicating that a should come after b in the sorted array.
                + If a.completed is false (meaning a is not completed and b is), the function returns -1, indicating that a should come before b in the sorted array. */
    });

    return (
        <div>
            {Comp.map((todo) => (
                <div className={cx('list-item-wrapper')} key={todo.id}>
                    <li className={cx('list-items', todo.completed ? 'complete' : '')}>
                        {todo.completed ? (
                            <BsCheckCircleFill
                                className={cx('button-complete')}
                                title="mark as complete"
                                onClick={() => handleComplete(todo)}
                            />
                        ) : (
                            <GoCircle
                                className={cx('button-complete')}
                                title="mark as complete"
                                onClick={() => handleComplete(todo)}
                            />
                        )}

                        <div className={cx('list-item')} onClick={() => handleEdit(todo)}>
                            <p className={cx('list-item-title')}>{todo.title}</p>
                            {todo.description && <p className={cx('list-item-description')}>{todo.description}</p>}
                            <p className={cx('list-item-createdAt')}>
                                <IoMdAddCircleOutline />
                                <span>Created: {todo.createdAt}</span>
                            </p>
                            {todo.dueDate && (
                                <p className={cx('list-item-dueDate', todo.completed ? 'complete' : '')}>
                                    <PiCalendarBlankLight />
                                    <span>Due date: {todo.dueDate}</span>
                                </p>
                            )}
                            {todo.completed && (
                                <p className={cx('list-item-completedAt')}>
                                    <MdDoneOutline />
                                    <span>Complete: {todo.completedAt}</span>
                                </p>
                            )}
                        </div>

                        <div className={cx('buttons')}>
                            {todo.completed === false && (
                                <FiEdit3
                                    className={cx('button-edit')}
                                    onClick={() => handleEdit(todo)}
                                    title="Edit todo"
                                />
                            )}
                            <RiDeleteBin6Line
                                className={cx('button-delete')}
                                onClick={() => handleDelete(todo)}
                                title="Delete todo"
                            />
                        </div>
                    </li>
                    <Divider aria-hidden="true" />
                </div>
            ))}
            <ToastContainer
                position="bottom-left"
                autoClose={false}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default TodoList;
