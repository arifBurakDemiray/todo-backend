import usersRouter from './todo.controller.js'
import authRouter from './auth.controller.js'
import cookieParser from 'cookie-parser';
import express from 'express';

export function subscribeEnpoints(app){
    app.use('/',usersRouter)
    app.use('/',authRouter)
}

export function configRequestTypes(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}
