import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchTodos from "../redux/todos/thunk/fetchTodos";
import CompletedTodo from "./CompletedTodo";
import Footer from "./Footer";
import Todo from "./Todo";

export default function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos);
    }, [dispatch]);

    const filterByStatus = (todo) => {
        const { status } = filters;
        switch (status) {
            case "Complete":
                return todo.completed;

            case "Incomplete":
                return !todo.completed;

            default:
                return true;
        }
    };

    const filterByColors = (todo) => {
        const { colors } = filters;
        if (colors.length > 0) {
            return colors.includes(todo?.color);
        }
        return true;
    };

    return (
        <>

            <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
                {todos
                    .filter(filterByStatus)
                    .filter(filterByColors)
                    .map((todo) => (todo.completed === false &&
                        < Todo todo={todo} key={todo.id} />
                    ))}
            </div>


            <hr className="mt-4" />

            <Footer />

            <hr className="mt-4" />
            <h3 className="text-center py-2">Completed Task</h3>
            <hr className="mb-4" />
            <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
                {todos
                    .filter(filterByStatus)
                    .filter(filterByColors)
                    .map((todo) => (todo.completed === true &&
                        <CompletedTodo todo={todo} key={todo.id} />
                    ))}
            </div>
        </>
    );
}
