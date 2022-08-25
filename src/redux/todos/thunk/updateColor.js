import { colorSelected } from "../actions";

const updateColor = (todoId, color) => {
    return async (dispatch) => {
        const response = await fetch(`https://anam-todoassignment.herokuapp.com/api/todos/${todoId}`, {
            method: "PATCH",
            body: JSON.stringify({
                color: color,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const todo = await response.json();

        dispatch(colorSelected(todo.id, todo.color));
    };
};

export default updateColor;
