import ICommunicationService from "../src/interfaces/ICommunicationService";
import CommunicationService from "../src/CommunicationService";
import reqBodyFixture from "../fixtures/RequestBody";
import { Mock, It, Times } from "moq.ts";
import * as express from 'express';
import IFBMessageParser from "../src/interfaces/IFBMessageParser";
import Command from "../src/Command";
import { RequestBody } from "../src/models/requestbody";


describe('CommunicationService', ()=>{

    test('ProcessRequest_WhenCalledForMessage_ShouldCheckForCommands', ()=>{
        const parser = new Mock<IFBMessageParser>();
        parser.setup(x=>x.parse(It.IsAny())).returns(Command["Price check"]);
        const service: ICommunicationService = new CommunicationService(parser.object());
        const body: RequestBody = reqBodyFixture;
        const req = new Mock<express.Request>();
        req.setup(x=>x.body).returns(body);
        const res = new Mock<express.Response>();

        service.processRequest(req.object(), res.object());
        parser.verify(x=>x.parse(body.entry[0].messaging[0].message.text), Times.Once());


    });// "check coin btc"

    test('ProcessRequest_WhenCalledForMessageWithoutCommand_ShouldReturnErrorMsg');// ask user to specify question

    test('ProcessRequest_WhenCalledWithCheckCommand_ShouldCallCoinApiAndReturnAskedValueIfCoinExists');

    test('ProcessRequest_WhenCalledWithCheckCommand_ShouldCallCoinApiAndReturnErrorMsgIfCoinDoesNotExists');


    test('ProcessRequest_WhenCalledForMessageWithCheckCommandOnMultipleCoins_ShouldCallCoinApiOnce');

    test('ProcessRequest_WhenCalledForMessageWithCheckCommandOnMultipleCoins_ShouldReturnAskedValuesForEachCoinOrErrorForNonExistingOnes');// "check coin btc eth zec"

    test('ProcessRequest_WhenEndpointError_ShouldReturnNetworkError');


});