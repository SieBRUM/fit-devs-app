import { IUser } from './IUser'
import { ILocation } from './ILocation'
import { IAchievementStatus } from './IAchievementStatus';

export interface IProfile {
    Id: number;
    IsLazy: boolean;
    Length: number;
    Location: ILocation;
    LocationId: number;
    User: IUser;
    UserId: number;
    Weigth: number;
    Achievements?: Array<IAchievementStatus>;
    Friends?: Array<IProfile>;
}