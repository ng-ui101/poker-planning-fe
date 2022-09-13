import {IUserEstimate} from "./user-estimate";

export interface IOutgoingMessage {
    type: OutgoingMessageType;
    name?: string;
    estimate?: number;
}

export interface IIncomingMessage {
    type: IncomingMessageType;
    finalEstimate?: number;
    estimates?: IUserEstimate[];
}

export enum IncomingMessageType {
    Estimates = 'estimates',
    FinalEstimate = 'final-estimate',
    UserLeave = 'user-leave',
    Reset = 'reset',
}

export enum OutgoingMessageType {
    SetEstimate = 'set-estimate',
    Accept = 'accept',
    Reset = 'reset',
    SetUserName = 'set-user-name',
    UserLeave = 'user-leave',
}
