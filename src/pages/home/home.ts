import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ChannelDetailPage } from '../channel-detail/channel-detail';
import { SummaryDetailPage } from '../summary-detail/summary-detail';
import { AboutPage } from '../about/about';
import { NotificationPage } from '../notification/notification';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  cards: any[] = [];
  profile_name: string = '';
  profile_company: string = '';
  profile_img_url: string = '';

  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
    let self = this;
    this.dataProvider.getProfileObservable().subscribe(
      (data)=>{
        if(data){
          self.profile_name = data['display_name'];
          self.profile_company = data['display_title'];
          self.profile_img_url = data['display_image'];
        }
      },
      err =>{

      }
    );
    this.populateHomeCards();

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  populateHomeCards() {
    let self = this;
    this.dataProvider.getHomeCardObservable().subscribe(
      (data: any[]) => {
        console.log(data);
        self.cards = data;
      },
      (err) => {

      }
    );
  }
  openPage(page: string, payload?: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
      let component: any = {};
      switch (page) {
        case 'channels':
          component = ChannelDetailPage;
          break;

        case 'summary':
          component = SummaryDetailPage;
          break;
        case 'about':
          component = AboutPage;
          break;
        // case 'notification':
        //   component = NotificationPage;
        //   break;
      }
      this.navCtrl.push(component, payload);
    
  }

}
