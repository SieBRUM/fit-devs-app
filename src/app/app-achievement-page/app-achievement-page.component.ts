import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { IProfile } from 'src/mapping/IProfile';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';
import { IAchievement } from 'src/mapping/IAchievement';
import { AchievementService } from '../achievement.service';

@Component({
    selector: 'app-achievement',
    templateUrl: './app-achievement-page.component.html',
    styleUrls: ['./app-achievement-page.component.sass'],
})
export class AppAchievementPageComponent {
    @Input() profile: IProfile;
    @Input() completedAchievements: Array<IAchievementStatus>;
    @Input() incompletedAchievements: Array<IAchievementStatus>;

    constructor(
        private achievementService: AchievementService
    ) { }

    shouldShowAchievement(achievement: IAchievementStatus): boolean {
        if (achievement.CurrentPoints >= achievement.Achievement.RequiredPoints) {
            if (
                this.completedAchievements.find(x => x.Achievement.Tier < achievement.Achievement.Tier
                    && x.Achievement.Name === achievement.Achievement.Name)
            ) {
                return true;
            }
        }

        return false;
    }
}
