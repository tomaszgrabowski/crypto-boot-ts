import IRequestSourceValidator from '../src/interfaces/IRequestSourceValidator';
import RequestSourceValidator from '../src/RequestSourceValidator';
import * as express from "express";
import { Mock } from 'moq.ts'

describe('RequestSourceValidator', ()=>{
    test('Validate_CalledWithRequestSourceSetsToPage_ShouldReturnTrue',()=>{
        const sourceValidator: IRequestSourceValidator = new RequestSourceValidator();
        const req = new Mock<express.Request>();
        req.setup(x=>x.body).returns({
            object: 'page'
        });
        expect(sourceValidator.validate(req.object())).toEqual(true);
    });
    test('Validate_CalledWithRequestSourceNotSetsToPageShouldReturnFalse',()=>{
        const sourceValidator: IRequestSourceValidator = new RequestSourceValidator();
        const req = new Mock<express.Request>();
        req.setup(x=>x.body.object).returns('notapage');
        expect(sourceValidator.validate(req.object())).toEqual(false);
    });
});