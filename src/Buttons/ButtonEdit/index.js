import {useContext} from "react";
import {SetDataForm, SetViewForm} from "../../context";

const ButtonEdit = ({data}) => {
    const contextViewForm = useContext(SetViewForm)
    const contextDataForm = useContext(SetDataForm)

    const editTodo = (e) => {
        e.preventDefault();
        contextViewForm.action(true) //открытие формы
        //объект из дата-атрибутов данных
        const data = {
            id: e.target.dataset.id,
            title: e.target.dataset.title,
            completed: (e.target.dataset.completed === 'true') ? true : false
        }
        contextDataForm.action(data)//устанавливаются состояния на основании data
    }

    return (
        <button onClick={editTodo} data-id={data.id} data-title={data.title} data-completed={data.completed}>Edit</button>
    )
}
export default ButtonEdit;