import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SummaryCard } from './models/summary-card.model';
import { SummaryPage } from './models/summary-page.model';
import { ChannelCard } from './models/channel-card.model';
import { ChannelPage } from './models/channel-page.model';
import { Subject } from 'rxjs/Subject';
import * as d3 from 'd3'
//import { SummaryDetailPage } from '../../pages/summary-detail/summary-detail';
//import { ChannelDetailPage } from '../../pages/channel-detail/channel-detail';
//import { LoginPage } from '../../pages/login/login';
//import { NotificationPage } from '../../pages/notification/notification';
import { UtilsProvider } from '../utils/utils';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {
  APP_VERSION: string = '1.0.0';
  REQUEST_URL: string = '';
  DATE_STRING: string = '';
  last_refreshed: string = '';
  homeCards: any[] = [];
  homeCardsSubject: Subject<any[]> = new Subject<any[]>();
  navBarData: any[] = [];
  navBarDataSubject: Subject<any[]> = new Subject<any[]>();
  profile: any = {};
  profile_subject: Subject<any> = new Subject<any>();

  constructor(public http: Http, private utils: UtilsProvider) {
  }

  fetchData() {
    let url: string = this.getRequestUrl();
    //this.last_refreshed = (new Date()).toISOString();
    console.log('fetching data', url);
    let self = this;
    if (url) {
      this.http.get(url).subscribe(
        (data) => { self.parseData(data.json()) },
        (err) => { }
      );
    }
  }

  setProfile(obj: any) {
    console.log('settin profile');
    if (obj) {
      this.profile = obj;
      this.profile_subject.next(this.profile);
    }
  }

  getProfileObservable() {
    return this.profile_subject.asObservable();
  }

  parseData(json: any) {
    console.log('parsing data');
    if (json && json['cards']) {
      this.homeCards = [];
      this.navBarData = [];
      let cards: any[] = json['cards'];
      this.setProfile(json['profile']);

      this.navBarData.push({ 'title': 'Home', 'component': {} });
      cards.forEach((item) => {
        this.DATE_STRING = item['date_today'];
        this.last_refreshed = item['last_refreshed'];
        let formatter: any;
        if (item['type'] === 'percentage') {
          formatter = this.utils.percentFormatter;
        } else if (item['type'] === 'dollar') {
          formatter = this.utils.dollarFormatter;
        } else {
          formatter = this.utils.formatter;
        }

        if (item['template'] === 'channels') {
          console.log('parsing channel');
          let card = this.processChannelCard(item['name'], item['collection']);
          let detail_pages = this.processChannelPage(item['name'], item['detail_trends'], formatter);
          card.setDetailPages(detail_pages);
          card.setFormatter(formatter);
          this.homeCards.push(card);
          let nav_item = {};
          nav_item['title'] = item['name'];
          nav_item['type'] = item['template']
          nav_item['payload'] = detail_pages;
          this.navBarData.push(nav_item);
        } else if (item['template'] === 'summary' || item['template'] === 'conversion') {
          console.log('parsing summary');
          let card = this.processSummaryCard(item['template'], item['name'], item['collection']);
          let detail_pages = this.processSummaryPage(item['name'], item['detail_trends'], formatter);
          card.setDetailPages(detail_pages);
          card.setFormatter(formatter);
          this.homeCards.push(card);
          let nav_item = {};
          nav_item['title'] = item['name'];
          nav_item['type'] = item['template'];
          nav_item['payload'] = detail_pages;
          this.navBarData.push(nav_item);
        }
      });
      this.navBarData.push({ 'title': 'Notifications', 'type': 'notification' })
      this.navBarData.push({ 'title': 'Log Out', 'type': 'login' });
      this.homeCardsSubject.next(this.homeCards);
      this.navBarDataSubject.next(this.navBarData);
    }
  }


  processSummaryCard(type: string, name: string, colletion: any[]) {
    let today: any = {};
    let lweek: any = {};
    let barLineData: any = {};
    colletion.forEach((item, index) => {
      if (index === 0) {//Today
        let count = 0;
        let vars = [];
        let vals = [];
        for (let e in item['data']) {
          let objs = Object.keys(item['data'][e]);
          if (objs.length === 1) {
            let temp = item['data'][e][objs[0]];
            if (count === 0) {
              vars.push('Today' + ': ' + this.utils.getKFormatted(temp));
            } else {
              vars.push(e + ': ' + this.utils.getKFormatted(temp));
            }


            if (isNaN(temp)) {
              temp = parseFloat(temp);
            }
            vals.push([temp]);
          }
          count++;
        }
        today['vars'] = vars;
        today['vals'] = vals;
      } else if (index === 1) {//Last week
        let count = 0;
        let vars = [];
        let vals = [];
        for (let e in item['data']) {
          let objs = Object.keys(item['data'][e]);
          if (objs.length === 1) {
            let temp = item['data'][e][objs[0]];
            if (count === 0) {
              vars.push('Last Week' + ': ' + this.utils.getKFormatted(temp));
            } else {
              vars.push(e + ': ' + this.utils.getKFormatted(temp));
            }
            //lweek[e] = item['data'][e][objs[0]];

            if (isNaN(temp)) {
              temp = parseFloat(temp);
            }
            vals.push([temp]);
          }
          count++;
        }
        lweek['vars'] = vars;
        lweek['vals'] = vals;
      } else if (index === 2) {//Daily trends
        let count = 0;
        for (let e in item['data']) {
          count++;
          if (count <= 2) {
            let keys = Object.keys(item['data'][e]);
            let arr: any[] = [];
            keys.forEach((k) => {
              if (isNaN(item['data'][e][k])) {
                arr.push(parseFloat(item['data'][e][k]));
              } else {
                arr.push(item['data'][e][k]);
              }

            });

            barLineData[count === 1 ? 'bar' : 'line'] = arr;
            if (typeof barLineData['labels'] === 'undefined') {
              barLineData['labels'] = keys;
            }
          }
        }
      }

    });
    return new SummaryCard(type, name, lweek, today, barLineData);
  }

  processSummaryPage(type, detail_trends: any[], formatter: any) {
    let pages: any = [];


    if (Object.prototype.toString.call(detail_trends) === '[object Array]') {
      detail_trends.forEach((item) => {//each slide/SummaryPage object
        let axis_labels: any = [];
        let bullets: any[] = [];
        let line_one_xlabels = [];
        let line_one_vals = [];
        let line_two_xlabels = [];
        let line_two_vals = [];
        let is_val_per: boolean = false;

        item.forEach((obj, index) => {
          if (index === 0 || index === 1) {
            let bullet = {};
            let bullet_data: any = {};
            let isPer: boolean = false;
            for (let o in obj) {
              if (Object.prototype.toString.call(obj[o]) === '[object Object]') {
                let collection = obj[o];
                let b_count = 0;
                for (let d in collection['data']) {
                  let arr = [];
                  for (let i in collection['data'][d]) {
                    let temp = collection['data'][d][i];
                    if (isNaN(temp)) {
                      let str: string = temp;
                      if (str.endsWith('%')) {
                        isPer = true;
                        is_val_per = true;
                        temp = parseFloat(temp);
                      }
                    }
                    arr.push(temp);


                  }
                  if (b_count == 0) {
                    bullet_data['actual'] = arr;
                  } else if (b_count === 1) {
                    bullet_data['target'] = arr;
                  } else {
                    bullet_data['projected'] = arr;
                  }
                  //bullet_data.push(arr);
                  b_count++;
                }
              }
            }
            bullet['data'] = bullet_data;
            bullet['isPer'] = isPer;
            bullets.push(bullet);

          }
          else if (index === 2) {

            for (let o in obj) {
              if (Object.prototype.toString.call(obj[o]) === '[object Object]') {
                let collection = obj[o];
                let count = 0;

                for (let col in collection) {
                  if (count == 0) {
                    let axis = collection[col];
                    for (let a in axis) {
                      axis_labels.push(axis[a]);
                    }
                  } else if (count == 1) {
                    let data = collection[col];
                    let iter = 0;
                    for (let d in data) {
                      let line_arr = data[d];
                      for (let x in line_arr) {
                        let val: any = line_arr[x];
                        if (isNaN(val)) {
                          val = parseFloat(val);
                          is_val_per = true;
                        }
                        if (val === null) {
                          val = 'abcd';
                        }
                        if (iter == 0) {
                          line_one_xlabels.push(x);
                          line_one_vals.push(val);
                        } else if (iter == 1) {
                          line_two_xlabels.push(x);
                          line_two_vals.push(val);
                        }
                      }
                      iter++;
                    }
                  }
                  count++;
                }
              }
            }

          }
        });
        let page = new SummaryPage(line_one_vals, line_one_xlabels, line_two_vals, line_two_xlabels, bullets, axis_labels);
        page.setPageName(type);
        page.setFormatter(formatter);
        page.setDate(this.DATE_STRING);
        pages.push(page);
      });

    }
    return pages;
  }

  processChannelCard(name: string, collection: any[]) {
    let bullets: any = {};
    let donut: any = {};
    let donut_cols: any[] = [];
    let self = this;

    if (Object.prototype.toString.call(collection) === '[object Array]') {
      collection.forEach((item, index) => {

        let data: any = item['data'];
        if (data) {
          for (let param in data) {
            let day: any[] = Object.keys(data[param]) || [];
            if (data[param][day[0]]) {
              let dataObj: any[] = Object.keys(data[param][day[0]]) || [];
              dataObj.forEach((d, i) => {
                if (index === 0) {
                  donut[d] = data[param][day[0]][d];
                  donut_cols.push(self.utils.getColor(i));
                } else if (index === 1) {
                  let temp: any = [data[param][day[0]][d]];
                  if (isNaN(temp)) {
                    temp = parseFloat(temp);
                  }
                  if (bullets[d]) {
                    bullets[d][param] = [data[param][day[0]][d]];
                  } else {
                    bullets[d] = {};
                    bullets[d][param] = [data[param][day[0]][d]];
                  }
                }
              })
            }
          }
        }

      })

    }
    //console.log(card);
    //return {'bullets': bullets, 'donut': donut};
    return new ChannelCard(name, bullets, donut, donut_cols);;
  }

  processChannelPage(name: string, detail_trends: any[], formatter: any) {
    let detail_pages: any[] = [];

    detail_trends.forEach((page) => {
      if (Object.prototype.toString.call(page) === '[object Array]') {//each ChannelPage
        let today_bullet_data: any[] = [];
        let lastweek_bullet_data: any[] = [];
        page.forEach((item, index) => {
          for (let key in item) {
            if (Object.prototype.toString.call(item[key]) === '[object Object]') {
              let collection = item[key];
              let count = 0;
              for (let col in collection) {
                if (count == 1) {
                  let bullet: any[] = [];
                  let data = collection[col];
                  let iter = 0;
                  for (let d in data) {
                    let day_obj = data[d];
                    for (let bull in day_obj) {
                      let bullet_obj = day_obj[bull];
                      let bullet_no = 0;
                      for (let b in bullet_obj) {

                        let isPer = false;

                        let temp: any = bullet_obj[b];
                        if (isNaN(temp)) {
                          if (temp.toString().endsWith('%')) {
                            isPer = true;
                          }

                          temp = parseFloat(temp);
                        }
                        if (iter == 0) {
                          let obj = {};
                          obj['title'] = b;
                          obj['actual'] = [temp];
                          obj['isPer'] = isPer;
                          bullet.push(obj);
                        } else {
                          bullet[bullet_no]['projected'] = [temp];
                        }
                        bullet_no++;
                      }
                    }
                    iter++;
                  }
                  if (index == 0) {
                    lastweek_bullet_data = bullet;
                  }
                  else if (index == 1) {
                    today_bullet_data = bullet;
                  }


                }
                count++;

              }
            }
          }

        });
        let page_obj = new ChannelPage(today_bullet_data, lastweek_bullet_data);
        page_obj.setPageName(name);
        page_obj.setFormatter(formatter);
        page_obj.setDate(this.DATE_STRING);
        detail_pages.push(page_obj);
      }

    });
    return detail_pages;

  }

  getHomeCardObservable() {
    return this.homeCardsSubject.asObservable();
  }

  getNavBarDataObservable() {
    return this.navBarDataSubject.asObservable();
  }

  setRequestUrl(url: string) {
    this.REQUEST_URL = url;
  }

  getRequestUrl() {
    return this.REQUEST_URL;
  }

  getLastRefreshed() {
    return this.last_refreshed;
  }

  getAppVersion() {
    return this.APP_VERSION;
  }

}
