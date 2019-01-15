import { Injectable } from '@angular/core';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';

@Injectable({
    providedIn: 'root'
})
export class AchievementService {

    getPercentage(achievement: IAchievementStatus): string {
        if (!achievement) {
            return '';
        }

        return `${Math.round((achievement.CurrentPoints / achievement.Achievement.RequiredPoints) * 100)}`;
    }

    getImage(achievement: IAchievementStatus): string {
        let image = '/assets/images/';
        // Categorie
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
        }
        // Tier
        switch (achievement.Achievement.Tier) {
            case 5: {
                image += 'Zwart';
                break;
            }
            case 4: {
                image += 'Rood';
                break;
            }
            case 3: {
                image += 'Bronze';
                break;
            }
            case 2: {
                image += 'Zilver';
                break;
            }
            case 1: {
                image += 'Goud';
                break;
            }
            default: {
                break;
            }
        }

        image += '.png';
        return image;
    }
}
