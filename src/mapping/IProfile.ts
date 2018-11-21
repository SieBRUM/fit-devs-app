import { IUser } from './IUser'
import { ILocation } from './ILocation'

export interface IProfile {
    DateOfBirth: string;
    Email: string;
    Id: number;
    IsLazy: boolean;
    Length: number;
    Location: ILocation;
    LocationId: number;
    Name: string;
    User: IUser;
    UserId: number;
    Weigth: number;
}