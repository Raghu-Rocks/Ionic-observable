import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SummaryDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-summary-detail',
  templateUrl: 'summary-detail.html',
})
export class SummaryDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('inside detail', navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryDetailPage');
  }

}
