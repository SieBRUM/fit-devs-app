import { IActivity } from './IActivity';

export class IAchievement {
    Id: number;
    Name: string;
    RequiredPoints: number;
    Description: string;
    Activity: IActivity;
    Tier: number;
}
