import { useState } from "react";
import { useDispatch } from "react-redux";
import cancelImage from "../assets/images/cancel.png";
import editText from "../assets/images/edit-text.png";
import deleteTodo from "../redux/todos/thunk/deleteTodo";
import { editTodoTile } from "../redux/todos/thunk/editTodoTitle";
import updateColor from "../redux/todos/thunk/updateColor";
import plusImage from "../assets/images/plus.png";
import updateStatus from "../redux/todos/thunk/updateStatus";

export default function CompletedTodo({ todo }) {
    const [isEditAble, setIsEditAble] = useState(false);
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const { text, id, completed, color } = todo;

    const handleStatusChange = (todoId) => {
        dispatch(updateStatus(todoId, completed));
    };

    const handleColorChange = (todoId, color) => {
        dispatch(updateColor(todoId, color));
    };

    const handleDelete = (todoId) => {
        dispatch(deleteTodo(todoId));
    };

    const handleEditAble = () => {
        setIsEditAble(!isEditAble);
    }
    const handleInput = (e) => {
        setInput(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editTodoTile(id, input));
        setInput("");
        setIsEditAble(false);
    };


    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div
                className={`relative rounded-full bg-white border-2 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${completed &&
                    "border-green-500 focus-within:border-green-500"
                    }`}
            >
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleStatusChange(id)}
                    className="opacity-0 absolute rounded-full"
                />
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

            {isEditAble ?
                <form
                    className="flex flex-1 bg-white px-4 py-1 rounded-md"
                    onSubmit={submitHandler}
                >
                    <img src={editText} className="w-6 h-6" alt="Add todo" />
                    <input
                        type="text"
                        placeholder="Type your todo"
                        className="w-full text-lg px-4 py-1 border-none outline-none text-gray-500"
                        value={input}
                        onChange={handleInput}
                    />
                    <button
                        type="submit"
                        className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                    ></button>
                </form>
                :
                <div
                    className={`select-none flex-1`}
                >
                    {text}
                </div>}

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${color === "green" && "bg-green-500"
                    }`}
                onClick={() => handleColorChange(id, "green")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${color === "yellow" && "bg-yellow-500"
                    }`}
                onClick={() => handleColorChange(id, "yellow")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${color === "red" && "bg-red-500"
                    }`}
                onClick={() => handleColorChange(id, "red")}
            ></div>

            <img
                src={editText}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleEditAble(id)}
            />

            <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleDelete(id)}
            />
        </div>
    );
}
