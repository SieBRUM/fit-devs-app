import { Component, Input } from '@angular/core';
import { IProfile } from 'src/mapping/IProfile';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';
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

    shouldShowProgress = true;

    constructor(
        private achievementService: AchievementService
    ) { }

    shouldShowAchievement(achievement: IAchievementStatus): boolean {
        if (achievement.CurrentPoints >= achievement.Achievement.RequiredPoints) {
            if (
                this.completedAchievements.find(x => x.Achievement.Tier < achievement.Achievement.Tier
                    && x.Achievement.Activity.ActivityName === achievement.Achievement.Activity.ActivityName)
            ) {
                return true;
            }
        }

        return false;
    }

    toReadableTier(tier: number) {
        switch (tier) {
            case 5: {
                return 'Zwart';
            }
            case 4: {
                return 'Rood';
            }
            case 3: {
                return 'Bronze';
            }
            case 2: {
                return 'Zilver';
            }
            case 1: {
                return 'Goud';
            }
            default: {
                return 'UNKNOWN';
            }
        }
    }

    hasnoAchievements(): boolean {
        if (Object.keys(this.completedAchievements).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    hasnoProgressAchievements(): boolean {
        if (Object.keys(this.incompletedAchievements).length > 0) {
            return true;
        } else {
            return false;
        }

    }
}
