import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import {NavLink } from 'react-router-dom';
import { BsLayoutSidebar } from 'react-icons/bs';
import { webRoutes } from '~/routes';

import AddTask from '../../../components/AddTask/AddTask';

const cx = classNames.bind(styles);

function Navbar({
    input,
    setInput,
    description,
    setDescription,
    dueDate,
    setdueDate,
    todos,
    setTodos,
    addTaskOpen,
    setAddTaskOpen,
    editTodo,
    setEditTodo,
    selectSlotCalendar,
    setSelectSlotCalendar,
    noteValue,
    setNoteValue,
    todayList,
    setTodayList,
}) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    console.log('sidebar', sidebar);
    return (
        <div className={cx('container', sidebar ? 'active' : '')}>
            <IconContext.Provider value={{ color: 'undefined' }}>
                <div className={cx('navbar')}>
                    <NavLink to="#" className={cx('menu-bars')}>
                        <BsLayoutSidebar onClick={showSidebar} />
                    </NavLink>
                </div>

                <nav className={cx('nav-menu', sidebar ? 'active' : '')}>
                {/* <nav className={cx('nav-menu')}> */}
                    <ul className={cx('nav-menu-items')} 
                    // onClick={showSidebar}
                    >
                        {addTaskOpen && (
                            <AddTask
                                addTaskOpen={addTaskOpen}
                                setOpenAddTask={setAddTaskOpen}
                                input={input}
                                setInput={setInput}
                                description={description}
                                setDescription={setDescription}
                                dueDate={dueDate}
                                setdueDate={setdueDate}
                                todos={todos}
                                setTodos={setTodos}
                                editTodo={editTodo}
                                setEditTodo={setEditTodo}
                                selectSlotCalendar={selectSlotCalendar}
                                setSelectSlotCalendar={setSelectSlotCalendar}
                                noteValue={noteValue}
                                setNoteValue={setNoteValue}
                            />
                        )}
                        {webRoutes(todos).map((item, index) => {
                            return (
                                <li key={index} className={cx(item.cName)}>
                                    {item.title === 'Add task' ? (
                                        <NavLink
                                            className={cx('addTask')}
                                            to={item.path}
                                            onClick={() => {
                                                setAddTaskOpen(true);
                                            }}
                                        >
                                            {item.icon}
                                            <span className={cx('title')}>{item.title}</span>
                                        </NavLink>
                                    ) : (
                                        <NavLink
                                            to={item.path}
                                            title={`go to ${item.title}`}
                                            style={({ isActive }) => {
                                                return {
                                                    color: isActive ? '#dc4c3e' : '#666',
                                                    backgroundColor: isActive ? '#ffefe5' : '',
                                                    borderRadius: isActive ? '5px' : '',
                                                    // viewTransitionName: isActive ? 'slide' : '',
                                                };
                                            }}
                                        >
                                            <div>
                                                {item.icon}
                                                <span className={cx('title')}>{item.title}</span>
                                            </div>
                                            <span className={cx('quantity')}>{item.quantity}</span>
                                        </NavLink>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    );
}

export default Navbar;
