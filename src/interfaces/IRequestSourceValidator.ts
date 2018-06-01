import * as express from "express";

export default interface IRequestSourceValidator{
    validate(req: express.Request): boolean;
}