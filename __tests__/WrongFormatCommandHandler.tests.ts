import WrongFormatCommandHandler from "../src/commandHandlers/WrongFormatCommandHandler";
import CommandParserError from "../src/CommandParserError";
import { Mock, It, Times } from "moq.ts";
import { AxiosInstance, AxiosPromise } from 'axios';
import IRequestSender from "../src/interfaces/IRequestSender";

describe('WrongFormatCommandHandler', () => {
    let handler: WrongFormatCommandHandler;
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
        handler = new WrongFormatCommandHandler(requestSender.object());
    });

    test('Constructor_WhenCalled_ShouldReturnObject', () => {
        expect(handler).not.toBeNull();
    });
});



