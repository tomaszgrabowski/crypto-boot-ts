import ICommunicationService from "../src/interfaces/ICommunicationService";
import CommunicationService from "../src/CommunicationService";
import reqBodyFixture from "../fixtures/RequestBody";
import { Mock, It, Times } from "moq.ts";
import * as express from 'express';
import IFBMessageParser from "../src/interfaces/IFBMessageParser";
import Command from "../src/Command";
import { RequestBody } from "../src/models/requestbody";
import IFactory from "../src/interfaces/IFactory";
import { ICommandHandler } from "../src/interfaces/ICommandHandler";
import IFBQueryParser from "../src/interfaces/IFBQueryParser";


describe('CommunicationService', () => {

    let parser: Mock<IFBMessageParser>,
        commandHandler: Mock<ICommandHandler>,
        factory: Mock<IFactory>,
        service: ICommunicationService,
        body: RequestBody,
        req: Mock<express.Request>,
        res: Mock<express.Response>;

    beforeEach(() => {
        parser = new Mock<IFBMessageParser>();
        parser.setup(x => x.parse(It.IsAny())).returns(Command["Price check"]);

        commandHandler = new Mock<ICommandHandler>();
        commandHandler.setup(x => x.respond()).returns(null);

        factory = new Mock<IFactory>();
        factory.setup(x => x.createCommandHandler(Command["Price check"])).returns(commandHandler.object());
        factory.setup(x=>x.createFBMessageParser()).returns(parser.object());

        service = new CommunicationService(factory.object());
        body = reqBodyFixture;
        req = new Mock<express.Request>();
        req.setup(x => x.body).returns(body);
        res = new Mock<express.Response>();
    });

    test('ProcessRequest_WhenCalledForMessage_ShouldCheckForCommands', () => {
        service.processRequest(req.object(), res.object());
        parser.verify(x => x.parse(body.entry[0].messaging[0].message.text), Times.Once());

    });// "check coin btc"

    test('ProcessRequest_WhenCalledForMessage_ShouldCreateCommandHandler', () => {

        service.processRequest(req.object(), res.object());
        factory.verify(x => x.createCommandHandler(Command["Price check"]), Times.Once());
    });

    test('ProcessRequest_WhenCalledForMessage_ShouldCallCommandHandlerRespond', () => {

        service.processRequest(req.object(), res.object());
    });

    test('ProcessRequest_WhenCalledForMessageWithoutCommand_ShouldReturnErrorMsg');// ask user to specify question

    test('ProcessRequest_WhenCalledWithCheckCommand_ShouldCallCoinApiAndReturnAskedValueIfCoinExists');

    test('ProcessRequest_WhenCalledWithCheckCommand_ShouldCallCoinApiAndReturnErrorMsgIfCoinDoesNotExists');


    test('ProcessRequest_WhenCalledForMessageWithCheckCommandOnMultipleCoins_ShouldCallCoinApiOnce');

    test('ProcessRequest_WhenCalledForMessageWithCheckCommandOnMultipleCoins_ShouldReturnAskedValuesForEachCoinOrErrorForNonExistingOnes');// "check coin btc eth zec"

    test('ProcessRequest_WhenEndpointError_ShouldReturnNetworkError');


});