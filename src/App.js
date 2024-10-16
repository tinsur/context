import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import {TodoContext, GetTodoContext, SetViewForm, SetDataForm} from './context.js';
import ListTodos from "./ListTodos";
import {URL} from "./const";
import Form from "./Form";
import ButtonAdd from "./Buttons/ButtonAdd";


function App() {
    const [todos, setTodos] = useState({'completed': [], 'unCompleted': []}) // состояние массива данных
    const [viewForm, setViewForm] = useState(false) //состояние появления формы
    const [dataForm, setDataForm] = useState({ // состояние данных из формы
        id: '',
        title: '',
        completed: false
    })
    const [getTodo, setGetTodo] = useState(true) // флаг для вызова юзэффекта


    //получение данных с сервера
    useEffect(() => {
        fetch(URL)
            .then((loadedData) => loadedData.json())
            .then((loadedTodos) => {
                const completed = loadedTodos.filter((item) => item.completed) // переменная для сделанных
                const unCompleted = loadedTodos.filter((item) => !item.completed) // переменная для не сделанных
                setTodos({'completed': completed, 'unCompleted': unCompleted});
            });
    }, [getTodo]);






    return (
        <TodoContext.Provider value={todos}>
            <GetTodoContext.Provider value={{'state':getTodo,'action':setGetTodo}}>
                <SetViewForm.Provider value={{'action': setViewForm}}>
                    <SetDataForm.Provider value={{'state':dataForm, 'action': setDataForm}}>

            <div className={styles.app}>

                <div className={styles.listWrap}>
                    <ListTodos completed='completed'>
                        <h2>Сделано</h2>
                    </ListTodos>
                    <ListTodos completed='unCompleted'>
                        <h2>Не сделано</h2>
                    </ListTodos>
                </div>

                <ButtonAdd/>

                {viewForm &&  <Form/>}


            </div>
                    </SetDataForm.Provider>
                </SetViewForm.Provider>
            </GetTodoContext.Provider>
        </TodoContext.Provider>
    );
}

export default App;
