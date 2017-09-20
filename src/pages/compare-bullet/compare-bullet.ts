import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompareBulletPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'compare-bullet',
  templateUrl: 'compare-bullet.html',
})
export class CompareBulletPage implements OnInit, OnChanges {
  @Input('todayBullet') today: any;
  @Input('lastWeekBullet') lastweek: any;
  @Input('showCompare') showCompare: boolean = true;
  @Input('formatter') formatter: any;

  bullet_name: string = '';
  today_data: any = {};
  lastweek_data: any = {};
  bullet_height: number = 16;
  bullet_pattern: any[] = ['lightgrey', 'orange', 'green'];
  show_compare: boolean = true;

  legend_lw_actual: string = '0';
  legend_lw_target: string = '0';
  legend_lw_proj: string = '0';
  legend_td_actual: string = '0';
  legend_td_target: string = '0';
  legend_td_proj: string = '0';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setData();
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompareBulletPage');
  }

  setData() {
    if (this.today) {
      this.today_data = this.today;
      if(this.today['title']){
        this.bullet_name = this.today['title'];
      }else{
        this.bullet_name = 'Total';
      }
    }
    if (this.lastweek) {
      this.lastweek_data = this.lastweek;
    }
    if(this.formatter){
      this.formatLegends();
    }
  }

  formatLegends() {
    if (this.lastweek_data) {
      if (this.lastweek_data['actual']) {
        this.legend_lw_actual = this.formatter(this.lastweek_data['actual']);
      }
      if (this.lastweek_data['target']) {
        this.legend_lw_target = this.formatter(this.lastweek_data['target']);
      }
      if (this.lastweek_data['projected']) {
        this.legend_lw_proj = this.formatter(this.lastweek_data['projected']);
      }
    }
    if (this.today_data) {
      if (this.today_data['actual']) {
        this.legend_td_actual = this.formatter(this.today_data['actual']);
      }
      if (this.today_data['target']) {
        this.legend_td_target = this.formatter(this.today_data['target']);
      }
      if (this.today_data['projected']) {
        this.legend_td_proj = this.formatter(this.today_data['projected']);
      }
    }
  }


}
