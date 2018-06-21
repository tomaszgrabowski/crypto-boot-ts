import UnknownCommandHandler from "../src/commandHandlers/UnknownCommandHandler";
import * as request from 'request';
import { HandlerResponse } from "../src/models/requestbody";
import CommandParserError from "../src/CommandParserError";
import { Mock, It, Times, IMock } from "moq.ts";
import axios, { AxiosInstance, AxiosPromise } from 'axios';
import IRequestSender from "../src/interfaces/IRequestSender";


describe('UnknownCommandHandler', () => {
    let handler: UnknownCommandHandler;
    let requestSender: Mock<IRequestSender>;
    let options: {};
    let requestBody: {};

    beforeEach(() => {

        requestSender = new Mock<IRequestSender>();
        requestSender.setup(x => x.Send(It.IsAny()));
        options = {
            "recipient": {
                "id": "test"
            },
            "message": {
                text: CommandParserError[CommandParserError["Unknown command, please type 'help' for more infromation..."]]
            }
        };
        requestBody = {
            qs: { "access_token": "testtoken" },
            json: options
        }
        handler = new UnknownCommandHandler(requestSender.object());
    });

    test('Constructor_WhenCalled_ShouldReturnObject', () => {
        expect(handler).not.toBeNull();
    });
})