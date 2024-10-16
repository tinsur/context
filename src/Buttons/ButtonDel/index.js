import {useContext} from "react";
import {GetTodoContext} from "../../context";
import {URL} from '../../const';

const ButtonDel = ({id}) => {
    const getTodoContext = useContext(GetTodoContext)
    const deleteTodo = (e) => {
        fetch(URL + e.target.dataset.id, {
            method: 'DELETE',
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                //блок успешного ответа
                getTodoContext.action(!getTodoContext.state)// смена флага для юзэффекта
            })
    }
    return (
        <button data-id={id} onClick={deleteTodo}>Delete</button>
    )
}
export default ButtonDel;