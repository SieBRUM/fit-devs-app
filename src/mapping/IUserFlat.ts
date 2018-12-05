export class IUserFlat {
    Id: number;
    Name: string;
    Username: string;
    Gender: number;
    DateOfBirth: Date;
    HasRequestOpen: FriendRequestStatus;
}

export enum FriendRequestStatus {
    HasSend,
    HasReceived,
    AreFriends,
    None
}
