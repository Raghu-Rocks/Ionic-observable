import { Component, Input, OnInit,  OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChannelCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'channel-card',
  templateUrl: 'channel-card.html',
})
export class ChannelCardPage implements OnInit, OnChanges, AfterViewInit {
  @Input('card') item;
  name: string = '';
  donut_data: any[] = [];
  donut_colors: any[] = [];

  legends: any[] = [];
  bullet_data: any[] = [];
  bullet_colors: any[] = [];
  bullet_height: number = 18;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelCardPage');
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

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  setData(){
    if(this.item){
      this.name = this.item.getName();
      this.donut_data = this.item.getDonut();
      this.donut_colors = this.item.getDonutColors();

      let cols = this.item.getBulletColors();
      for(let e=0; e<3; e++){
        let col_arr = ['lightgrey', cols[e], 'transparent'];
        this.bullet_colors.push(col_arr);
      }
      this.bullet_data = this.item.getBulletDataAsArray();
      this.legends = this.item.getLabels();
    }
  }

}
