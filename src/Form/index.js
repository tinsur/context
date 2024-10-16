import {SetDataForm, SetViewForm, GetTodoContext} from "../context";
import React, {useContext} from "react";
import {URL} from '../const';
import styles from './style.module.css'


const Form = () => {
    const contextDataForm = useContext(SetDataForm);
    const contextViewForm = useContext(SetViewForm);
    const getTodoContext = useContext(GetTodoContext);

    // событие отправки формы
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {...contextDataForm.state}; //промежуточная переменная для отправки данных без айди
        delete data.id; //удаление айди
        console.log(URL)
        let url = '', method = '';
        //условие для определения добавить или редактировать данные
        if (contextDataForm.state.id !== '') {
            url = URL + contextDataForm.state.id;
            method = 'PUT';
        } else {
            url = String(URL);
            method = 'POST';
        }
        console.log(url)
        //отправка запроса для добавления или редактирования
        fetch(url, {
            method: method, //метод запроса для определения действия: добавить или редактировать
            headers: {'Content-Type': 'application/json;charset=utf-8'},// заголовки для сервера, указывают тип контента и кодировку
            body: JSON.stringify(data),// тело запроса в котором данные конвертируются в JSON строку

        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                //блок успешного ответа
                contextViewForm.action(false);// скрытие формы
                getTodoContext.action(!getTodoContext.state)// смена флага для юзэффекта
                //setRefreshProducts(!refreshProducts);
            })
        // .finally(() => setIsCreating(false));
    }
    //событие изменения title
    const onChangeTitle = (e) => {
        contextDataForm.action({...contextDataForm.state, title: e.target.value}) //в состояние устанавливается новое значение title
    }
    //событие изменения checked
    const onChangeCompleted = (e) => {
        contextDataForm.action({...contextDataForm.state, completed: e.target.checked})//в состояние устанавливается новое значение чекбокса
    }
    return (
        <div className={styles.formWrap}>
            <form onSubmit={onSubmit}>
                <input type="hidden" value={contextDataForm.state.id}/>
                <input type="text" value={contextDataForm.state.title} onChange={onChangeTitle}/>
                <input type="checkbox" checked={contextDataForm.state.completed} onChange={onChangeCompleted}/>
                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}
export default Form;