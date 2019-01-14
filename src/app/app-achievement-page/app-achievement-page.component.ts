import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { IProfile } from 'src/mapping/IProfile';
import { SnackBarService } from 'ng7-snack-bar';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';
import { IAchievement } from 'src/mapping/IAchievement';

@Component({
    selector: 'app-achievement',
    templateUrl: './app-achievement-page.component.html',
    styleUrls: ['./app-achievement-page.component.sass'],
})
export class AppAchievementPageComponent {
    @Input() profile: IProfile;
    @Input() completedAchievements: Array<IAchievementStatus>;
    @Input() incompletedAchievements: Array<IAchievementStatus>;

    getPercentage(achievement: IAchievementStatus): string {
        if (!achievement) {
            return '';
        }

        return `${Math.round((achievement.CurrentPoints / achievement.Achievement.RequiredPoints) * 100)}`;
    }

    getPlaatje(achievement: IAchievementStatus): string {
        let image = '';

        // Catogorie
        if (achievement.Achievement.Name.indexOf('Atletiek') > -1) {
            image += 'Atletiek/BadgeAtletiek';
        } else if (achievement.Achievement.Name.indexOf('Badminton') > -1) {
            image += 'Badminton/Badminton';
        } else if (achievement.Achievement.Name.indexOf('Basketball') > -1) {
            image += 'Basketball/BadgeBasketball';
        } else if (achievement.Achievement.Name.indexOf('Fitness') > -1) {
            image += 'Fitness/BadgeFitness';
        } else if (achievement.Achievement.Name.indexOf('Football') > -1) {
            image += 'Football/BadgeFootball';
        } else if (achievement.Achievement.Name.indexOf('Handbal') > -1) {
            image += 'Handbal/BadgeHandbal';
        } else if (achievement.Achievement.Name.indexOf('Hardlopen') > -1) {
            image += 'Hardlopen/Hardlopen';
        } else if (achievement.Achievement.Name.indexOf('Hockey') > -1) {
            image += 'Hockey/BadgeHockey';
        } else if (achievement.Achievement.Name.indexOf('Honkbal') > -1) {
            image += 'Honkbal/Honkball';
        } else if (achievement.Achievement.Name.indexOf('PingPong') > -1) {
            image += 'PingPong/BadgePingPong';
        } else if (achievement.Achievement.Name.indexOf('Soccer') > -1) {
            image += 'Soccer/BadgeSoccer';
        } else if (achievement.Achievement.Name.indexOf('Tennis') > -1) {
            image += 'Tennis/BadgeTennis';
        } else if (achievement.Achievement.Name.indexOf('Vechtsport') > -1) {
            image += 'Vechtsport/Vechtsport';
        } else if (achievement.Achievement.Name.indexOf('Wielrennen') > -1) {
            image += 'Wielrennen/Wielrennen';
        } else if (achievement.Achievement.Name.indexOf('Yoga') > -1) {
            image += 'Yoga/Yoga';
        } else if (achievement.Achievement.Name.indexOf('Zwemmen') > -1) {
            image += 'Zwemmen/BadgeZwemmen';
        } else {
            image += '';
        }

        // Tier
        if (achievement.Achievement.Tier === 5) {
            image += 'Zwart';
        } else if (achievement.Achievement.Tier === 4) {
            image += 'Rood';
        } else if (achievement.Achievement.Tier === 3) {
            image += 'Bronze';
        } else if (achievement.Achievement.Tier === 2) {
            image += 'Zilver';
        } else if (achievement.Achievement.Tier === 1) {
            image += 'Goud';
        } else {
            image += '';
        }
        return image;
    }

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
