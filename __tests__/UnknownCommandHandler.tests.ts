import UnknownCommandHandler from "../src/commandHandlers/UnknownCommandHandler";
import * as request from 'request';
import { HandlerResponse } from "../src/models/requestbody";
import CommandParserError from "../src/CommandParserError";
import { Mock, It, Times, IMock } from "moq.ts";
import axios, { AxiosInstance, AxiosPromise } from 'axios';


describe('UnknownCommandHandler', () => {
    let handler: UnknownCommandHandler;
    let axiosMock: Mock<AxiosInstance>;
    let options: {};
    let requestBody: {};

    beforeEach(() => {

        axiosMock = new Mock<AxiosInstance>();
        var axiosPromise: Mock<AxiosPromise> = new Mock<AxiosPromise>();
        axiosPromise.setup(x => x.catch(It.IsAny())).returns(null);
        axiosMock.setup(x => x.post(It.IsAny(), It.IsAny())).returns(axiosPromise.object());
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
        handler = new UnknownCommandHandler(axiosMock.object());
    });

    test('Constructor_WhenCalled_ShouldReturnObject', () => {
        expect(handler).not.toBeNull();
    });

    test('Respond_WhenCalled_ShouldCalAxiosWithUnknowCommandResponse', () => {

        //console.error(,requestBody);
        handler.respond("test", "test");
        axiosMock.verify(x => x.post, Times.Once());
    })
})