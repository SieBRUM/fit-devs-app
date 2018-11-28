import { IAchievement } from "./IAchievement";

export class IAchievementStatus {
    Id: number;
    ProfileId: number;
    AchievementId: number;
    CurrentPoints: number;
    Achievement: IAchievement
}