import { IRecoveryQuestion } from './IRecoveryQuestion';

export class IUser {
    Id: number;
    Username: string;
    Password: string;
    Gender?: number;
    Email: string;
    Name: string;
    DateOfBirth: Date;
    Cookie: string;
    RecoveryId: number;
    RecoveryAnswer: string;
    WebSocketConnection?: string;
    Recovery?: IRecoveryQuestion;
}
