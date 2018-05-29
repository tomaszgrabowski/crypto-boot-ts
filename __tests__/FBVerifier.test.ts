import FBVerifier from "../src/FBVerifier";
import { Mock, It } from 'moq.ts';
import * as express from 'express';
import IFBQueryParser from "../src/interfaces/IFBQueryParser";

describe('FBQueryParser', () => {
    test('Parse_WhenCalledWithProperVerifyToken_ShouldReturnTrue',()=>{
        const req = new Mock<express.Request>();
        const parser = new Mock<IFBQueryParser>();
        parser.setup(x=>x.parse(req.object())).returns({
            mode: 'subscribe',
            challenge: 'test',
            token: 'test'
        });

        const verifier = new FBVerifier(req.object(), parser.object(), 'test');
        expect(verifier.verify()).toEqual(true);
    });

    test('Parse_WhenCalledWithWrongVerifyToken_ShouldReturnFalse',()=>{
        const req = new Mock<express.Request>();
        const parser = new Mock<IFBQueryParser>();
        parser.setup(x=>x.parse(req.object())).returns({
            mode: 'subscribe',
            challenge: 'test',
            token: 'test'
        });

        const verifier = new FBVerifier(req.object(), parser.object(), 'test');
        expect(verifier.verify()).toEqual(true);
    });

    test('Parse_WhenCalledInNotSubscribeMode_ShouldReturnFalse',()=>{
        const req = new Mock<express.Request>();
        const parser = new Mock<IFBQueryParser>();
        parser.setup(x=>x.parse(req.object())).returns({
            mode: 'notasubscribemode',
            challenge: 'test',
            token: 'test'
        });

        const verifier = new FBVerifier(req.object(), parser.object(), 'test');
        expect(verifier.verify()).toEqual(false);
    });
});