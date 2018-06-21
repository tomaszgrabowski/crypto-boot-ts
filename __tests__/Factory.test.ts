import Factory from "../src/Factory";
import FBQueryParser from '../src/FBQueryParser';
import IFactory from "../src/interfaces/IFactory";
import FBVerifier from "../src/FBVerifier";
import * as express from 'express';
import RequestSourceValidator from "../src/RequestSourceValidator";
import CommunicationService from "../src/CommunicationService";
import Command from "../src/Command";
import CommandWraper from "../src/CommandWrapper";
import PriceCheckCommandHandler from "../src/commandHandlers/PriceCheckCommandHandler";
import WrongFormatCommandHandler from "../src/commandHandlers/WrongFormatCommandHandler";
import UnknownCommandHandler from "../src/commandHandlers/UnknownCommandHandler";
import Axios , {AxiosInstance} from "axios";
import CoinApi from "../src/CoinApi";
import RequestSender from "../src/RequestSender";
import HelpCommandHandler from "../src/commandHandlers/HelpCommandHandler";

describe('Factory', () => {
    let factory: IFactory;

    beforeEach(() => {
        factory = new Factory();
    })

    test('createFBQueryParser_WhenCalled_ShouldCreateFBQueryParserObject', () => {
        const parser = factory.createFBQueryParser();
        expect(parser).not.toBeNull;

        //todo: how to check on interface instead??
        expect(parser).toBeInstanceOf(FBQueryParser);
    });

    test('createFBVerifier_WhenCalled_ShouldCreateFBVerifierObject', () => {
        const verifier = factory.createFBVerifier("testToken");
        expect(verifier).not.toBeNull;

        //todo: how to check on interface instead??
        expect(verifier).toBeInstanceOf(FBVerifier);
    });

    test('createExpressApp_WhenCalled_ShouldCreateExpressApplicationObject', () => {
        const app = factory.createExpressApp();
        expect(app).not.toBeNull;
    });

    test('createExpressRouter_WhenCalled_ShouldCreateExpressRouterObject', () => {
        const router = factory.createExpressRouter()
        expect(router).not.toBeNull;
    });

    test('createRequestSourceValidator_WhenCalled_ShouldCreateRequestSourceValidator', () => {
        const validator = factory.createSourceValidator();
        expect(validator).not.toBeNull;

        //todo: how to check on interface instead??
        expect(validator).toBeInstanceOf(RequestSourceValidator);
    });

    test('createExpressRouter_WhenCalled_ShouldCreateCommunicationServiceObject', () => {
        const commService = factory.createCommunicationService()
        expect(commService).not.toBeNull;
        expect(commService).toBeInstanceOf(CommunicationService);
    });

    test('createCommandHandler_WhenCalledWithStringStartsWithCommandPriceCheck_ShouldRetutnPriceCheckCommandHandler', () => {
        const text = 'Price check BTC';
        const handler = factory.createCommandHandler(text);
        expect(handler).toBeInstanceOf(PriceCheckCommandHandler);
    });

    test('createCommandHandler_WhenCalledWithStringStartsWithCommandPriceCheckLowerCase_ShouldRetutnPriceCheckCommandHandler', () => {
        const text = 'price Check BtC';
        const handler = factory.createCommandHandler(text);
        expect(handler).toBeInstanceOf(PriceCheckCommandHandler);
    });
    test('createCommandHandler_WhenCalledWithStringNotStartingWithCommandText_ShouldRetutnWrongFormatCommandHandler', () => {
        const text = 'blah blah Price check BTC';
        const handler = factory.createCommandHandler(text);
        expect(handler).toBeInstanceOf(WrongFormatCommandHandler);
    });
    test('createCommandHandler_WhenCalledWithStringNotContainingCommandText_ShouldRetutnUnknownCommandHandler', () => {
        const text = 'blah blah';
        const handler = factory.createCommandHandler(text);
        expect(handler).toBeInstanceOf(UnknownCommandHandler);
    });

    test('createCommandHandler_WhenCalledWithHelpText_ShouldRetutnHelpCommandHandler', () => {
        const text = 'help';
        const handler = factory.createCommandHandler(text);
        expect(handler).toBeInstanceOf(HelpCommandHandler);
    });

    test('createAxiosInstance_WhenCalled_ShouldReturnAxiosInstance', () => {
        const axios = factory.createAxiosInstance();
        expect(axios).not.toBeNull();
        //expect(axios).toBeInstanceOf(AxiosInstance);
    });

    test('createCoinApi_WhenCalled_ShouldReturnCoinApiInstance', () => {
        const coinApi = factory.createCoinApi();
        expect(coinApi).not.toBeNull();
        expect(coinApi).toBeInstanceOf(CoinApi);
    });

    test('createRequestSender_whenCalled_SHouldReturnRequestSenderInstance', ()=>{
        const sender = factory.createIRequestSender();
        expect(sender).not.toBeNull();
        expect(sender).toBeInstanceOf(RequestSender);
    });

})