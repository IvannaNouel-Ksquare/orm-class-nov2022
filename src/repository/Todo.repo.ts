import { Todo } from "../models/Todo.model";

// Create operation

export const createTodo =async (description:string) => {
    try {
        const newTodo = await Todo.create({
            description
        })

        return newTodo.id;
    } catch (error) {
        console.error(error);
    }
}