import CommandParserError from "../CommandParserError";

export class RequestBody {
    object: string;
    entry: Entry[]
}

export class Entry {
    id: string;
    time: number;
    messaging: Messaging[]
}

export class Messaging {
    sender: {
        id: string
    };
    recipient: {
        id: string
    };
    timestamp: number;
    message: Message;
}

export class Message{
    mid: string;
    seq: number;
    text: string
}

export class HandlerResponse{
    text: string;
}