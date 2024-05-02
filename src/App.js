import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import '~/App.css';
import { webRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { useState, useEffect } from 'react';

function App() {
    const initialState = JSON.parse(localStorage.getItem('todos')) || [];

    const [input, setInput] = useState('');
    const [description, setDescription] = useState('');
    const [noteValue, setNoteValue] = useState('');
    const [dueDate, setdueDate] = useState('');
    const [todos, setTodos] = useState(initialState);
    const [todayList, setTodayList] = useState('');
    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [selectSlotCalendar, setSelectSlotCalendar] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {webRoutes(todos).map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout
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
                                    >
                                        <Page
                                            todos={todos}
                                            setTodos={setTodos}
                                            addTaskOpen={addTaskOpen}
                                            setAddTaskOpen={setAddTaskOpen}
                                            editTodo={editTodo}
                                            setEditTodo={setEditTodo}
                                            dueDate={dueDate}
                                            setdueDate={setdueDate}
                                            selectSlotCalendar={selectSlotCalendar}
                                            setSelectSlotCalendar={setSelectSlotCalendar}
                                            noteValue={noteValue}
                                            setNoteValue={setNoteValue}
                                            todayList={todayList}
                                            setTodayList={setTodayList}    
                                        />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
