import { Component, Input, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'summary-card',
  templateUrl: 'summary-card.html',
})
export class SummaryCardPage implements OnInit, OnChanges, AfterViewInit {
  @Input('card') item: any;
  name: string;
  lastWeekBullet: any;
  todayBullet: any;
  todayLegends: any[] = [];
  lastWeekLegends: any[] = [];
  todayBulletData: any[] = [];
  lastWeekBulletData: any = [];
  showCard: boolean = false;
  height: number = 20;
  rounded: boolean = true;
  bullets_cols: any[] = ['lightgrey', 'orange', 'green'];

  barData: any[] = [];
  dashData: any[] = [];
  barLabels: any[] = [];
  formatter: any;


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
    if(this.showCard && changes){
      this.setData()
    }

  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.showCard = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryCardPage');
  }
navigateToDetailScreen(){
        this.navCtrl.push("SummaryDetailPage", this.item['detail_pages']);
}
  setData() {
    if (this.item) {
      this.name = this.item.getName();
      this.todayBullet = this.item.getTodayBullet();
      this.todayBulletData = this.item.getBulletData('TODAY');
      this.lastWeekBulletData = this.item.getBulletData('LASTWEEK');
      this.lastWeekBullet = this.item.getLastWeekBullet();
      this.todayLegends = this.item.getBulletLegends('TODAY');
      this.lastWeekLegends = this.item.getBulletLegends('LASTWEEK');
      this.barData = this.item.getBarData();
      this.dashData = this.item.getLineData();
      this.barLabels = this.item.getBarchartLabels();
      this.formatter = this.item.getFormatter();
    }
  }

}
