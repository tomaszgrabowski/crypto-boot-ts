import ICommunicationService from "../src/interfaces/ICommunicationService";
import CommunicationService from "../src/CommunicationService";
import reqBodyFixture from "../fixtures/RequestBody";
import { Mock, It, Times, verifierFactory } from "moq.ts";
import * as express from 'express';
import IFBMessageParser from "../src/interfaces/IFBMessageParser";
import Command from "../src/Command";
import { RequestBody } from "../src/models/requestbody";
import IFactory from "../src/interfaces/IFactory";
import IFBQueryParser from "../src/interfaces/IFBQueryParser";
import CommandWraper from "../src/CommandWrapper";
import CommandHandler from "../src/commandHandlers/CommandHandler";
import PriceCheckCommandHandler from "../src/commandHandlers/PriceCheckCommandHandler";


describe('CommunicationService', () => {

    let parser: Mock<IFBMessageParser>,
        commandHandler: Mock<CommandHandler>,
        factory: Mock<IFactory>,
        service: ICommunicationService,
        body: RequestBody,
        req: Mock<express.Request>,
        res: Mock<express.Response>;

    beforeEach(() => {
        parser = new Mock<IFBMessageParser>();
        parser.setup(x => x.parse(It.IsAny())).returns(Command["Price check"]);

        commandHandler = new Mock<PriceCheckCommandHandler>();
        commandHandler.setup(x => x.respond(It.IsAny(), It.IsAny())).returns(null);

        const wrapper = new CommandWraper();
        wrapper.command = Command["Price check"];

        factory = new Mock<IFactory>();
        factory.setup(x => x.createCommandHandler(It.IsAny())).returns(commandHandler.object());
        factory.setup(x => x.createFBMessageParser()).returns(parser.object());

        service = new CommunicationService(factory.object());
        body = reqBodyFixture;
        req = new Mock<express.Request>();
        req.setup(x => x.body).returns(body);
        res = new Mock<express.Response>();
    });
    test('ProcessRequest_WhenCalledForMessage_ShouldCreateCommandHandler', () => {
        service.processRequest(req.object(), res.object());
        factory.verify(x => x.createCommandHandler, Times.Once());
    });

    test('ProcessRequest_WhenCalledForMessage_ShouldCallCommandHandlerRespond', () => {
        const wrapper = new CommandWraper();
        wrapper.command = Command["Price check"];
        service.processRequest(req.object(), res.object());
        factory.setup(x => x.createCommandHandler(wrapper)).returns(commandHandler);
        commandHandler.verify(x=>x.respond(It.IsAny(), It.IsAny()), Times.Once());
    });

});