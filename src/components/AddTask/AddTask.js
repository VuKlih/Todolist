import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddTask.module.scss';
import { Divider } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker} from 'antd';
import dayjs from 'dayjs';
import { IoAdd } from 'react-icons/io5';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./AddTask.css"

const cx = classNames.bind(styles);

function AddTask({
    setOpenAddTask,
    input,
    setInput,
    description,
    setDescription,
    dueDate,
    setdueDate,
    todos,
    setTodos,
    editTodo,
    setEditTodo,
    selectSlotCalendar,
    setSelectSlotCalendar,
    noteValue,
    setNoteValue,
}) {
    const [takeNoteClicked, setTakeNoteClicked] = useState(false);

    const onInputChange = (event) => {
        setInput(event.target.value);
    };
    const onDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
            setDescription(editTodo.description);
            setdueDate(editTodo.dueDate);
            setNoteValue(editTodo.noteValue);
        } else if (selectSlotCalendar) {
            setInput('');
            setdueDate(selectSlotCalendar);
            setDescription('');
            setNoteValue('');
        } else {
            setInput('');
            setdueDate('');
            setDescription('');
            setNoteValue(undefined);
        }
    }, [setInput, setDescription, setdueDate, editTodo, selectSlotCalendar, setNoteValue]);

    const updateTodo = (title, description, noteValue, dueDate, id, createdAt, completed, completedAt) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? { title, description, noteValue, dueDate, id, createdAt, completed, completedAt } : todo,
        );
        setTodos(newTodo);
        setNoteValue(undefined);
        setEditTodo('');
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!editTodo) {
            setTodos([
                ...todos,
                {
                    id: uuidv4(),
                    title: input,
                    description: description,
                    noteValue: noteValue,
                    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    dueDate: dueDate,
                    completed: false,
                    clicked: false,
                },
            ]);

            setInput('');
            setDescription('');
            setdueDate('');
            setEditTodo('');
            setNoteValue(undefined);
            setOpenAddTask(false);
        } else {
            updateTodo(
                input,
                description,
                noteValue === '<p><br></p>' ? undefined : noteValue,
                dueDate,
                editTodo.id,
                editTodo.createdAt,
                editTodo.completed,
                editTodo.completedAt,
            );
            setOpenAddTask(false);
        }
    };

    const toolbarOptions = {
        container: [
            [{ header: [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'blockquote'],
            [{ list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };
    const module = { toolbar: toolbarOptions };

    return (
        <div className={cx('addTaskBackground')}>
            <div className={cx('addTaskContainer')}>
                <div className={cx('titleCloseBtn')}>
                    <button
                        onClick={() => {
                            setOpenAddTask(false);
                            setEditTodo('');
                            setSelectSlotCalendar('');
                        }}
                        title="Cancel and close" // Tooltip text
                    >
                        X
                    </button>
                </div>

                <div>
                    <form onSubmit={onFormSubmit}>
                        <input
                            type="text"
                            placeholder="Task name"
                            className={cx('task-input')}
                            value={input}
                            required
                            onChange={onInputChange}
                        />

                        <div className={cx('des-field')}>
                            <HiOutlineMenuAlt2 />
                            <input
                                type="text"
                                placeholder="Description"
                                className={cx('task-des')}
                                value={description}
                                onChange={onDescriptionChange}
                            />
                        </div>

                        {(editTodo || selectSlotCalendar) && (
                            <div>
                                <button
                                    type="button"
                                    className={cx('take-note')}
                                    onClick={() => {
                                        setTakeNoteClicked(!takeNoteClicked);
                                    }}
                                >
                                    <IoAdd />
                                    <p>Add note</p>
                                </button>

                                {(takeNoteClicked || noteValue) && (
                                    <div className={cx('note')}>
                                        <ReactQuill
                                            // className={cx('react-quill')}
                                            modules={module}
                                            value={noteValue}
                                            onChange={(value) => {
                                                setNoteValue(value);
                                            }}
                                            placeholder="Add a note"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        <Divider aria-hidden="true" />

                        <div className={cx('footer')}>
                            <div className={cx('dueDateField')}>
                                <DatePicker
                                    defaultValue={
                                        editTodo.dueDate
                                            ? dayjs(editTodo.dueDate, 'YYYY-MM-DD HH:mm:ss')
                                            : undefined || selectSlotCalendar
                                            ? dayjs(selectSlotCalendar, 'YYYY-MM-DD HH:mm:ss')
                                            : undefined
                                    }
                                    className={cx('datePicker')}
                                    placeholder={'Set due date'}
                                    minDate={dayjs()}
                                    showTime
                                    onChange={(value, dateString) => {
                                        // console.log('Selected Time: ', value);
                                        // console.log('Formatted Selected Time: ', dateString);
                                        setdueDate(dateString);
                                    }}
                                />
                            </div>
                            <button
                                className={cx('cancelBtn')}
                                onClick={() => {
                                    setEditTodo('');
                                    setSelectSlotCalendar('');
                                    setOpenAddTask(false);
                                }}
                                title="Cancel and close" // Tooltip text
                            >
                                Cancel
                            </button>
                            <button type="submit" className={cx('btnAddTask')}>
                                {editTodo ? 'Update' : 'Add task'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
