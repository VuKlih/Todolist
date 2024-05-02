import Today from '~/pages/Today';
import Inbox from '~/pages/Inbox';
import UpComming from '~/pages/UpComming';

import { IoIosAddCircle } from "react-icons/io";
import { BsInboxesFill } from "react-icons/bs";
import { BsCalendar3Event } from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import dayjs from 'dayjs';

const webRoutes = (todos) => { 
    
    const todayList = todos.filter((todo) => {
        return dayjs(todo.dueDate).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') && todo.completed === false;
    })

    const inboxList = todos.filter((todo) => {
        return todo.completed === false;
    })


    return [
    { title: 'Add task',
    icon: <IoIosAddCircle />,
    cName: "nav-text"  ,
    },

    { title: 'Inbox',
    path: '/inbox',
    icon: <BsInboxesFill />    ,
    cName: "nav-text",
    component: Inbox ,
    quantity: inboxList.length,
    },

    { title: 'Today',
    path: '/',
    icon: <BsCalendar3Event />    ,
    cName: "nav-text",
    component: Today ,
    quantity: todayList.length,

},
    
    { title: 'UpComming',
    path: '/upComming',
    icon: <BsCalendar3 />,
    cName: "nav-text",
    component: UpComming ,
},
] };

export { webRoutes };
