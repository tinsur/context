import {useContext} from 'react';
import {TodoContext} from '../context.js';
import styles from './style.module.css';
import ButtonDel from "../Buttons/ButtonDel";
import ButtonEdit from "../Buttons/ButtonEdit";

const ListTodos = ({completed,children}) => {
    const todos=useContext(TodoContext);
    return (
        <div className={styles.list}>
            {children}
            {todos[completed].map((data) => (
                <div className={styles.todo} key={data.id}>{data.title}
                    <div>
                        <ButtonDel id={data.id}/>
                        <ButtonEdit data={data}/>

                    </div>
                </div>
            ))}
        </div>
    )
}
export default ListTodos;