import { loaded } from "../actions";

export const editTodoTile = (todoId, titleText) => {
    console.log(todoId, titleText);
    return async (dispatch) => {
        await fetch(`http://localhost:9000/todos/${todoId}`, {
            method: "PATCH",
            body: JSON.stringify({
                text: titleText,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const updatedTodosResponse = await fetch(`http://localhost:9000/todos`)
        const todos = await updatedTodosResponse.json();

        dispatch(loaded(todos));
    };
}