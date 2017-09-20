export class ChannelPage {
    page_name: string = '';
    today_bullet: any[] = [];
    lastweek_bullet: any[] = [];
    bullet_names: any[] = []
    formatter: any;
    date: string;
    constructor(today_bullet: any[], lastweek_bullet: any[]) {
        this.lastweek_bullet = lastweek_bullet;
        this.today_bullet = today_bullet;
        this.setBulletNames();
    }

    getTodayBullet() {
        return this.today_bullet;
    }

    getLastweekBullet() {
        return this.lastweek_bullet;
    }

    setBulletNames() {
        if (this.today_bullet) {
            let self = this;
            this.today_bullet.forEach((item) => {
                self.bullet_names.push(item);
            })
        }
    }

    getBulletNames() {
        return this.bullet_names;
    }

    setPageName(name: string) {
        this.page_name = name;
    }

    getPageName() {
        return this.page_name;
    }

    setFormatter(formatter: any) {
        this.formatter = formatter;
    }

    getFormatter() {
        return this.formatter;
    }

    setDate(date: string){
        let d = new Date(date);
        let temp = d.toDateString();
        let arr = temp.split(' ');
        if (arr.length === 4) {
            this.date = arr[1] + ' ' + arr[2] + ', ' + arr[3];
        }
    }

    getDate(){
        return this.date;
    }
}