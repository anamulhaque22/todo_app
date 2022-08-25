import { deleted } from "../actions";

const deleteTodo = (todoId) => {
    return async (dispatch) => {
        await fetch(`https://anam-todoassignment.herokuapp.com/api/todos/${todoId}`, {
            method: "DELETE",
        });

        dispatch(deleted(todoId));
    };
};

export default deleteTodo;
