import * as express from 'express';
import FBQueryParams from '../FBQueryParams';

export default interface IFBQueryParser{
    parse(req: express.Request): FBQueryParams
}