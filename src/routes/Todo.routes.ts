import { Router, Request, Response } from 'express';
import { createTodo } from '../repository/Todo.repo'
export const TodoRouter = Router();

TodoRouter.post('/', async (req: Request, res: Response) => {
    const description: string = req.body.description as string;

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
        id: newTodoId
    })
})