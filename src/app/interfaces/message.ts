import {IUserEstimate} from "./user-estimate";

export interface IMessage {
    type: MessageType;
    name?: string;
    estimate?: number;
    finalEstimate?: number;
    estimates?: IUserEstimate[];
}

export enum MessageType {
    Estimates = 'estimates', // in
    FinalEstimate = 'final-estimate', // in
    UserLeave = 'user-leave', // in

    SetEstimate = 'set-estimate', // out
    Accept = 'accept', // out
    Reset = 'reset', // in-out
    SetUserName = 'set-user-name' // out
}
