import { Router, Request, Response } from 'express';
import { createURL, getURL } from '../repository/Url.repo';
import { nanoid } from 'nanoid';
import { TodoRouter } from './Todo.routes';
import { fetchTodoById, updateTodoById } from '../repository/Todo.repo';
export const UrlRouter = Router();

UrlRouter.post('/', async (req: Request, res: Response) => {
    const url: string = req.body.url as string;

    if (!url) {
        //user errors
        res.status(400)
        return res.send({
            message: 'No URL'
        })
    }

    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const shortURL = nanoid();
    const newURL = await createURL(url,shortURL);
    
    res.status(201);
    res.send({
        newURL
    })
})

UrlRouter.get('/:short', async (req: Request, res: Response) => {
    const short: string = req.params.short as string;

    if (!short) {
        res.status(400)
        return res.send({
            message: 'No URL'
        })
    }

    const currentURL = await getURL(short);
    if (!currentURL) {
        res.status(400)
        return res.send({
            message: 'URL does not exist'
        })
    }
    res.status(201);
    res.send({
        currentURL,
    })
})
