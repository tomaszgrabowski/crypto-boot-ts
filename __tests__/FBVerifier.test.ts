import FBVerifier from "../src/FBVerifier";
import { Mock, It } from 'moq.ts';
import * as express from 'express';
import IFBQueryParser from "../src/interfaces/IFBQueryParser";
import IFactory from "../src/interfaces/IFactory";

describe('FBVerifier', () => {
    test('Parse_WhenCalledWithProperVerifyToken_ShouldReturnTrue',()=>{
        const req = new Mock<express.Request>();
        const parser = new Mock<IFBQueryParser>();
        parser.setup(x=>x.parse(req.object())).returns({
            mode: 'subscribe',
            challenge: 'test',
            token: 'test'
        });
        const factory = new Mock<IFactory>();
        factory.setup(x=>x.createFBQueryParser()).returns(parser.object());

        const verifier = new FBVerifier(factory.object(), 'test');
        expect(verifier.verify(req.object())).toEqual(true);
    });

    test('Parse_WhenCalledWithWrongVerifyToken_ShouldReturnFalse',()=>{
        const req = new Mock<express.Request>();
        const parser = new Mock<IFBQueryParser>();
        parser.setup(x=>x.parse(req.object())).returns({
            mode: 'subscribe',
            challenge: 'test',
            token: 'test'
        });
        const factory = new Mock<IFactory>();
        factory.setup(x=>x.createFBQueryParser()).returns(parser.object());

        const verifier = new FBVerifier(factory.object(), 'test');
        expect(verifier.verify(req.object())).toEqual(true);
    });

    test('Parse_WhenCalledInNotSubscribeMode_ShouldReturnFalse',()=>{
        const req = new Mock<express.Request>();
        const parser = new Mock<IFBQueryParser>();
        parser.setup(x=>x.parse(req.object())).returns({
            mode: 'notasubscribemode',
            challenge: 'test',
            token: 'test'
        });
        const factory = new Mock<IFactory>();
        factory.setup(x=>x.createFBQueryParser()).returns(parser.object());
        const verifier = new FBVerifier(factory.object(), 'test');
        expect(verifier.verify(req.object())).toEqual(false);
    });
});