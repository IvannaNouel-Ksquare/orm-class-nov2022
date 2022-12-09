import { InferAttributes } from "sequelize";
import { Todo } from "../models/Todo.model";

// Create operation
//CRUD
export const listTodos = async () => {
    const res = await Todo.findAll();

    return res;

}

export const createTodo = async (description: string) => {
    try {
        const newTodo = await Todo.create({
            description
        })

        return newTodo.id;
    } catch (error) {
        console.error(error);
    }
}

export const fetchTodoById = async (id: number) => {
    try {
        const foundTodo = await Todo.findByPk(id);

        return foundTodo;

    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateTodoById = async (todoModel: InferAttributes<Todo>) => {
    try {

        const { id, description, is_completed } = todoModel;

        const updated = await Todo.update({
            description: description,
            is_completed: is_completed
        }, {
            where: {
                id: id
            }
        });        

        return updated[0];

    } catch (error) {
        console.error(error);
        return null
    }
}

export const deleteTodoById = async (id: number) => {
    try {
        const foo = await Todo.destroy({
            where: {
                id: id
            }
        })

        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }
}
