export class SummaryCard {
    type: string;
    name: string;
    lastWeekBullet: any = {};
    todayBullet: any = {};
    barChartData: any = {};
    detail_pages: any[] = [];
    formatter: any;
    
    constructor(type: string, name: string, lastWeekBullet: any, todayBullet: any, barChartData: any) {
        this.type = type;
        this.name = name;
        this.lastWeekBullet = lastWeekBullet;
        this.todayBullet = todayBullet;
        this.barChartData = barChartData
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    getTodayBullet() {
        return this.todayBullet;
    }

    getLastWeekBullet() {
        return this.lastWeekBullet;
    }

    getBarLineChartData() {
        return this.barChartData;
    }

    getBulletLegends(bullet: string) {
        if (bullet === 'TODAY') {
            return this.todayBullet['vars'];
        } else if (bullet === 'LASTWEEK') {
            return this.lastWeekBullet['vars'];
        }
    }

    getBulletData(bullet: string) {
        if (bullet === 'TODAY') {
            return this.todayBullet['vals'];
        } else if (bullet === 'LASTWEEK') {
            return this.lastWeekBullet['vals'];
        }
    }

    getBarData() {
        return this.barChartData['bar'] || [];
    }

    getLineData() {
        return this.barChartData['line'] || [];
    }

    getBarchartLabels() {
        return this.barChartData['labels'] || [];
    }

    setDetailPages(detail_pages: any[]) {
        this.detail_pages = detail_pages;
    }

    getDetailPages() {
        return this.detail_pages;
    }

    setFormatter(formatter: any) {
        this.formatter = formatter;
    }

    getFormatter() {
        return this.formatter;
    }
}