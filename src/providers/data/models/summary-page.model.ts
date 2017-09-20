export class SummaryPage {
    compareBullet: any[];
    line_one_data: any[];
    line_two_data: any[];
    line_one_xlabel: any[];
    line_two_xlabel: any[];
    labels: any[] = [];
    page_name: string = '';
    formatter: any;
    date: string;

    constructor(line_one_data: any[], line_one_xlabel: any[], line_two_data: any[], line_two_xlabel: any[], compareBullet: any[], labels: any[]) {
        this.line_one_data = line_one_data;
        this.line_two_data = line_two_data;
        this.line_two_xlabel = line_two_xlabel;
        this.line_one_xlabel = line_one_xlabel;
        this.labels = labels;
        this.compareBullet = compareBullet;
    }

    getCompareBullet() {
        return this.compareBullet;
    }

    getLineOne() {
        let item: any = {};
        item['xlabels'] = this.line_one_xlabel;
        item['data'] = this.line_one_data;
        return item;
    }

    getLineTwo() {
        let item: any = {};
        item['xlabels'] = this.line_two_xlabel;
        item['data'] = this.line_two_data;
        return item;
    }

    getLabels() {
        return this.labels;
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

    setDate(date: string) {
        let d = new Date(date);
        let temp = d.toDateString();
        let arr = temp.split(' ');
        if (arr.length === 4) {
            this.date = arr[1] + ' ' + arr[2] + ', ' + arr[3];
        }
    }

    getDate() {
        return this.date;
    }
}