import * as express from "express";

export default class FBVerifier {
    verifyToken: string = 'anna';
    token: string;
    mode: string;
    challenge: string;

    constructor(req: express.Request) {
        this.mode = req.query['hub.mode'];
        this.token = req.query['hub.verify_token'];
        this.challenge = req.query['hub.challenge'];
    }

    verify(){
        return (this.mode === 'subscribe' && this.token === this.verifyToken);
    }
}