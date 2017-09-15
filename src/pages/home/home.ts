import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

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
    this.populateHomeCards();
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

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  populateHomeCards() {
    let self = this;
    this.dataProvider.getHomeCardObservable().subscribe(
      (data: any[]) => {
        console.log(data, 'home cards');
        self.cards = data;
      },
      (err) => {

      }
    );
  }
}
