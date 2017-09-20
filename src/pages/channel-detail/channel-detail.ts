import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompareBulletPage } from '../compare-bullet/compare-bullet';
import { NotificationPage } from '../notification/notification';
import { AboutPage } from '../about/about';
/**
 * Generated class for the ChannelDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel-detail',
  templateUrl: 'channel-detail.html',
})
export class ChannelDetailPage {
  page_data: any;
  today_bullet_data: any[] = [];
  lastweek_bullet_data: any[] = [];
  showCompareBullet: boolean[] = [];
  page_name: string = '';
  formatter: any;
  date: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('inside detail', navParams);
    if (Object.prototype.toString.call(navParams.data) === '[object Array]') {
      this.page_data = navParams.data[0];
      if(this.page_data){
        this.page_name = this.page_data['page_name'];
        this.today_bullet_data = this.page_data['today_bullet'];
        this.lastweek_bullet_data = this.page_data['lastweek_bullet'];
        this.formatter = this.page_data.getFormatter();
        this.date = this.page_data.getDate();
        this.initCompareBullet();
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelDetailPage');
  }

  initCompareBullet() {
    if (this.today_bullet_data) {
      this.showCompareBullet = [];
      let len = this.today_bullet_data.length;
      for (let i = 0; i < len; i++) {
        if (i == 0) {
          this.showCompareBullet.push(true);
        } else {
          this.showCompareBullet.push(false);
        }
      }
    }
  }

  toggleBulletState(index: number) {
    if (this.showCompareBullet) {
      let len = this.showCompareBullet.length;
      for (let i = 0; i < len; i++) {
        if (i === index) {
          this.showCompareBullet[i] = !this.showCompareBullet[i];
        }else{
          this.showCompareBullet[i] = false;
        }
      }
    }
  }

  goto(page: string) {
    console.log(page);
    switch (page) {
      case 'HOME':
        this.navCtrl.pop();
        break;
      case 'NOTIFICATION':
        this.navCtrl.push(NotificationPage);
        break;
      case 'SETTINGS':
        this.navCtrl.push(AboutPage);
        break;
      default:
        break;
    }
  }

}
