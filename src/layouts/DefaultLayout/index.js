import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Navbar from '~/layouts/components/Navbar';
import Divider from '@mui/material/Divider';

const cx = classNames.bind(styles);

function DefaultLayout({
    children,
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
    return (
        <div className={cx('container')}>
            <div className={cx('navbar')}>
                <Navbar
                    input={input}
                    setInput={setInput}
                    description={description}
                    setDescription={setDescription}
                    dueDate={dueDate}
                    setdueDate={setdueDate}
                    todos={todos}
                    setTodos={setTodos}
                    addTaskOpen={addTaskOpen}
                    setAddTaskOpen={setAddTaskOpen}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}
                    selectSlotCalendar={selectSlotCalendar}
                    setSelectSlotCalendar={setSelectSlotCalendar}
                    noteValue={noteValue}
                    setNoteValue={setNoteValue}
                    todayList={todayList}
                    setTodayList={setTodayList}    

                />
            </div>
            <div className={cx('content')} data-bs-backdrop="false">
                <div className={cx('header-wrapper')}>
                    <Header />
                    <Divider aria-hidden="true" />
                </div>
                <div className={cx('main-content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
