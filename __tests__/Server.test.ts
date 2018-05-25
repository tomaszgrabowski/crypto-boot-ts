import { Server } from "../src/Server";

describe('Server', ()=>{

    test('ShouldBeAbleToInstantiate', ()=>{
        const server = new Server();
        expect(server).not.toBeNull;
    })

    test('ShouldListenOnPort1337', ()=>{
        const server = new Server();
        expect(server.port).toBe(1337);
    })

    test('Init_WhenCalled_ShouldCallExpressListen', ()=>{

    });

});