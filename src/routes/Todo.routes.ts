import { InferAttributes } from "sequelize";
import { Router, Request, Response } from 'express';
import { Todo } from '../models/Todo.model';
import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
export const TodoRouter = Router();

TodoRouter.post('/', async (req: Request, res: Response) => {
    const { description } = req.body;

    if (!description) {
        res.status(400)
        return res.send({
            message: 'No description'
        })
    }

    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newTodoId = await createTodo(description);

    res.status(201);
    res.send({
        id: newTodoId,
        description
    })
})



TodoRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params["id"]);    
    
    if (!id) {
        res.status(400)
        return res.send({
            message: 'invalid id'
        })
    }

    const Todo = await fetchTodoById(id);

    if (!Todo) {
        res.status(404)
        return res.send({
            message: 'not Found'
        })
    }
    res.status(200)
    return res.send(
        Todo,
    )

});

TodoRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params["id"]);    

    const { description, is_completed } = req.body as Todo;

    if (!id) {
        res.status(400)
        return res.send({
            message: 'invalid id'
        })
    }

    const todo: InferAttributes<Todo> = {
        id,
        description,
        is_completed
    }

    const affectedRows = await updateTodoById(todo)

    if (affectedRows === 0) {
        res.status(404)
        return res.send({
            message: 'something went wrong'
        })
    }


    res.status(200);
    res.send({affectedRows});

});

TodoRouter.delete('/:id', async (req: Request, res: Response) => {

    const id = Number(req.params["id"]);    

    if (!id) {
        res.status(400)
        return res.send({
            message: 'invalid id'
        })
    }

    const Todo = await deleteTodoById(id);

    if (!Todo) {
        res.status(404)
        return res.send({
            message: 'nothing happened'
        })
    }

    return res.sendStatus(200);

});