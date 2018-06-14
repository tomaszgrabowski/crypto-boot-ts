import ICommandHandler from "../interfaces/ICommandHandler";
import * as request from 'request';
import { Message, HandlerResponse } from "../models/requestbody";
import axios, { AxiosInstance } from 'axios';



export default abstract class CommandHandler {

    protected PAGE_ACCESS_TOKEN: string = process.env.PAGE_ACCESS_TOKEN || 'testtoken';

    abstract respond(sender_psid: string, received_message: string): void;

    constructor(protected axios: AxiosInstance) {
    }

    protected SendMessage(sender_psid: string, response: HandlerResponse) {
        const request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        };
        const data = {
            qs:{ "access_token": this.PAGE_ACCESS_TOKEN },
            json: request_body
        };
        //console.log(data);
        this.axios.post('https://graph.facebook.com/v2.6/me/messages',
            data
        ).catch((err)=>{
            console.error("Unable to send message:" + err);
        })


        // request({
        //     "uri": "https://graph.facebook.com/v2.6/me/messages",
        //     "qs": { "access_token": this.PAGE_ACCESS_TOKEN },
        //     "method": "POST",
        //     "json": request_body
        // }, (err, res, body) => {
        //     if (!err) {
        //     } else {
        //         console.error("Unable to send message:" + err);
        //     }
        // });
    }


}