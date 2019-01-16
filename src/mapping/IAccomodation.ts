import { ILocation } from './ILocation';
import { IActivity } from './IActivity';

export class IAccomodation {
    Id: number;
    ActivityId: number;
    LocationId: number;
    Name: string;
    Surrounding: AccomodationSurrounding;
    Location: ILocation;
    Activity: IActivity;
}

export enum AccomodationSurrounding {
    Inside,
    Outside,
    Both
}
