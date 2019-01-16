import { IActivity } from './IActivity';

export class IAchievement {
    Id: number;
    RequiredPoints: number;
    Description: string;
    Tier: number;
    ActivityId: number;
    Activity: IActivity;
}
