import { Component, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
  //,
  //providers: [DataProvider]
})
export class AboutPage implements OnInit, OnChanges {
  last_refreshed: string = '';
  version: string = '';
  //@Inject(DataProvider) private dataProvider: DataProvider;
  constructor(public navCtrl: NavController, public navParams: NavParams
     , public dataProvider: DataProvider 
  ) {
    this.dataProvider.getHomeCardObservable().subscribe(
      data => {
        this.getLastRefreshed();
        this.getVersion();
      }
    );
  }

  ionViewDidLoad() {
    this.getLastRefreshed();
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getLastRefreshed();
    this.getVersion();
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  refresh(){
    this.dataProvider.fetchData();
    this.getLastRefreshed();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.navCtrl.setRoot("HomePage");
  }

  getLastRefreshed(){
    this.last_refreshed = this.dataProvider.getLastRefreshed();
  }

  getVersion(){
    this.version = this.dataProvider.getAppVersion();
  }

}
