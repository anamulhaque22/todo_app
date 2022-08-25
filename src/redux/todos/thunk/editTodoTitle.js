import { loaded } from "../actions";

export const editTodoTile = (todoId, titleText) => {
    console.log(todoId, titleText);
    return async (dispatch) => {
        await fetch(`https://anam-todoassignment.herokuapp.com/api/todos/${todoId}`, {
            method: "PATCH",
            body: JSON.stringify({
                text: titleText,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const updatedTodosResponse = await fetch(`https://anam-todoassignment.herokuapp.com/api/todos`)
        const todos = await updatedTodosResponse.json();

        dispatch(loaded(todos));
    };
}