export class ChannelCard {
    type: string;
    name: string;
    bullets: any = {};
    donut: any = {}
    donut_cols: any[] = [];
    detail_pages: any[] = [];

    constructor(name: string,
        bullets: any, donut: any, donut_cols?: any[]) {
        this.type = 'channel';
        this.name = name;
        this.bullets = bullets;
        this.donut = donut;
        this.donut_cols = donut_cols;
    }

    getBullets() {
        return this.bullets;
    }

    getBulletDataAsArray(){
        let bullets = this.bullets;
        let res = [];
        let count = 0;
        for(let b in bullets){
            if(count === 3){
                break;
            }
            let arr = [];
            for(let k in bullets[b]){
                let data = [bullets[b][k]];
                arr.push(data);
            }
            res.push({ 'item': b, 'data':  arr});
            count++;
        }
        return res;
    }

    getBulletColors(){
        return this.donut_cols.slice(0,3);
    }

    getLabels(){
        let res = [];
        for(let k in this.donut){
            res.push(k);
        }
        return res;
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    getDonut() {
        let res: any[] = [];
        if (this.donut) {
            for (let k in this.donut) {
                let arr = [];
                arr.push(k);
                arr.push(this.donut[k]);
                res.push(arr);
            }
        }
        return res;
    }

    getDonutColors() {
        return this.donut_cols;
    }

    getChannels() {
        return Object.keys(this.bullets) || [];
    }
    setDetailPages(detail_pages: any[]){
        this.detail_pages = detail_pages;
    }

    getDetailPages(){
        return this.detail_pages;
    }
}