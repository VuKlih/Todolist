import classNames from 'classnames/bind';
import styles from './UpComming.module.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';

import Header from '~/pages/components/Header';

const cx = classNames.bind(styles);
const localizer = dayjsLocalizer(dayjs);

function UpComming({
    todos,
    setTodos,
    setEditTodo,
    setAddTaskOpen,
    dueDate,
    setdueDate,
    selectSlotCalendar,
    setSelectSlotCalendar,
}) {
    // console.log(todos);

    let upCommingList = [];
    todos.forEach((todo) => {
        if (dayjs().isSameOrBefore(dayjs(todo.dueDate), 'day') && todo.completed === false) {
            upCommingList.push({
                ...todo,
                createdAt: new Date(todo.createdAt), // Convert to JavaScript Date object for Calendar
                dueDate: new Date(todo.dueDate), // Convert to JavaScript Date object for Calendar
            });
        }
    });
    // console.log(upCommingList);
    // console.log(todos);

    const handleSelectEvent = (event) => {
        const findEvent = todos.find((todo) => todo.id === event.id);
        setEditTodo(findEvent);
        setAddTaskOpen(true);
        console.log(event);
    };

    const handleSelectSlot = ({ start }) => {
        const end = dayjs(start).format('YYYY/MM/DD HH:mm:ss');
        setSelectSlotCalendar(end)
        setAddTaskOpen(true);
    };

    return (
        <div className={cx('wrapper')}>
            <Header title="UpComming" className={cx('header')} />
            <div className={cx('content')}>
                <Calendar
                    className={cx('calendar')}
                    localizer={localizer}
                    events={upCommingList}
                    startAccessor="dueDate"
                    endAccessor="dueDate"
                    onSelectEvent={handleSelectEvent}
                    views={[Views.MONTH, Views.WEEK, Views.DAY]}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    eventPropGetter={(event) => {
                        return {
                            style: {
                                backgroundColor: '#dc4c3e',
                            },
                        };
                    }}
                />
            </div>
        </div>
    );
}

export default UpComming;
