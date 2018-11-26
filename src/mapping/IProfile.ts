import { IUser } from './IUser'
import { ILocation } from './ILocation'

export interface IProfile {
    Id: number;
    IsLazy: boolean;
    Length: number;
    Location: ILocation;
    LocationId: number;
    User: IUser;
    UserId: number;
    Weigth: number;
}