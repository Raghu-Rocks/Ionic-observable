export class ChannelPage{
    today_bullet: any[] = [];
    lastweek_bullet: any[] = [];

    constructor(today_bullet: any[], lastweek_bullet: any[]){
        this.lastweek_bullet = lastweek_bullet;
        this.today_bullet = today_bullet;
    }

    getTodayBullet(){
        return this.today_bullet;
    }

    getLastweekBullet(){
        return this.lastweek_bullet;
    }
}