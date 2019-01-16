import { IAchievementStatus } from './IAchievementStatus';

export class IUserFlat {
    Id: number;
    Username: string;
    Name: string;
    DateOfBirth: Date;
    IsLazy: boolean;
    CompletedAchievements: IAchievementStatus[];
    Gender: number;
    HasRequestOpen: FriendRequestStatus;
}

export enum FriendRequestStatus {
    HasSend,
    HasReceived,
    AreFriends,
    None
}
