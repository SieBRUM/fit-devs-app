import { IAchievement } from './IAchievement';
import { IProfile } from './IProfile';

export class IAchievementStatus {
    Id: number;
    ProfileId: number;
    AchievementId: number;
    CurrentPoints: number;
    Achievement: IAchievement;
    Profile: IProfile;
}
