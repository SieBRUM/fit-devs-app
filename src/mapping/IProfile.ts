import { IUser } from './IUser';
import { ILocation } from './ILocation';
import { IAchievementStatus } from './IAchievementStatus';

export interface IProfile {
    Id: number;
    UserId: number;
    LocationId: number;
    Length: number;
    Weigth: number;
    IsLazy: boolean;
    Location: ILocation;
    User: IUser;
    Achievements?: Array<IAchievementStatus>;
    Friends?: Array<IProfile>;
}
