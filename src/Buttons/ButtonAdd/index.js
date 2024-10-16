import {useContext} from "react";
import {SetDataForm, SetViewForm} from "../../context";
import styles from './style.module.css'


const ButtonAdd = () => {

    const contextDataForm = useContext(SetDataForm);
    const contextViewForm = useContext(SetViewForm);

    const addTodo = () => {
        contextViewForm.action(true)
        //обнуление состояния формы
        contextDataForm.action({
            id: '',
            title: '',
            completed: false
        })
    }
    return (
        <button className={styles.addTodo} onClick={addTodo}>Add todo</button>
    )
}
export default ButtonAdd;