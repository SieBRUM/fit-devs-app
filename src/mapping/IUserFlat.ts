import { IAchievementStatus } from './IAchievementStatus';

export class IUserFlat {
    Id: number;
    Name: string;
    Username: string;
    CompletedAchievements: IAchievementStatus[];
    Gender: number;
    DateOfBirth: Date;
    IsLazy: boolean;
    HasRequestOpen: FriendRequestStatus;
}

export enum FriendRequestStatus {
    HasSend,
    HasReceived,
    AreFriends,
    None
}
