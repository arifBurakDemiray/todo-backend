import express from 'express';
import {authenticateToken,getUserName} from '../services/jwt.service.js'
import { orm } from '../db/db.js'
import {router} from './router.js'

/* GET todo listing. */
router.get('/todos',authenticateToken, async function(req, res, next) {

    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)

    const todos = await orm.todo.findMany({
        orderBy: [
            {
                done: 'asc',
                priority: 'desc'
            }
        ],
        skip: page*size,
        take: size,
        where : {
            active: true
        },
    })
    res.json(todos);
});

router.get('/todo:id',function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/todo',authenticateToken, async function(req, res, next) {
    const name = req.query.name
    const prio = parseFloat(req.query.priority)

    const todo = await orm.todo.create({
        data: {
            name:name,
            priority:prio,
          user: { connect: { email: getUserName(req) } },
        },
    
      })
    
      res.json(todo)
});

router.patch('/todo:id',function(req, res, next) {
    res.send('respond with a resource');
});

router.delete('/todo:id',function(req, res, next) {
    res.send('respond with a resource');
});

export default router;
