import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NotificationPage } from '../pages/notification/notification';
import { AboutPage } from '../pages/about/about';
import { SummaryDetailPage } from '../pages/summary-detail/summary-detail';
import { ChannelDetailPage } from '../pages/channel-detail/channel-detail';
import { ListPage } from '../pages/list/list';
import { DataProvider } from '../providers/data/data';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
	DMAAppDebug = true;
	authToken:any;
	tokenLength:any;
	baseURL = "https://expcloudapp.adobe.com";
	validateTokenURL = this.baseURL + "/mca/api/v1/user/";
	logOutURLBase = this.baseURL + "/mca/auth/logout/";
	failureURLFormat = "/auth/failed/";
	logoutURLFormat = "/auth/logoutsuccess/";

  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  navMenu: any[] = [];


  constructor(
	public platform: Platform, 
	public statusBar: StatusBar, 
	public splashScreen: SplashScreen,
	private storage: Storage,
	public events: Events,
	private iab: InAppBrowser,
    public dataProvider: DataProvider) {
		  
		this.events.subscribe('user:created', (token) => {
				// user and time are the same arguments passed in `events.publish(user, time)`
    			this.dataProvider.fetchData('assets/json/data.json');		
				console.log('Welcome', token, 'at');
  		});
	this.initializeApp();
	this.checkingUserTokenForLogin();
    let self = this;
      // self.checkingUserTokenForLogin();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'List', component: ListPage }
    ];
    this.dataProvider.getNavBarDataObservable().subscribe(
      (data: any[]) => {
        //console.log(data);
        self.navMenu = data;
      },
      (err) => {

      }
    );
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
	//Add 'implements OnInit' to the class.
  }
	checkingUserTokenForLogin(){
		this.storage.length().then((val) =>{
				let tokenLength = val;
				console.log('len=='+ tokenLength);
				// alert('length'+this.tokenLength);
					if(tokenLength > 0){
						// alert("You are logged in ");
						this.rootPage = HomePage;
    					this.dataProvider.fetchData('assets/json/data.json');
						
					}	
					else{
						// alert("Need To Login");
						this.rootPage = LoginPage;
					}
			});
			this.storage.get('IMSIToken').then((val) =>{
				this.authToken = val;
				console.log("tokenval=="+val +" "+ this.authToken);
			});
	}
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page && page.title !== 'Home') {
      this.nav.push(page.component, page.payload);
    }
  }

	onLogOut() {
	/* Logout Action */
		var logOutURL = this.logOutURLBase + this.authToken;
		var browser = this.iab.create(logOutURL, "_blank", "location=no,toolbar=no");
		this.nav.push(LoginPage);
		browser.on('loadstop').subscribe((data) => {
			if (data.url.indexOf(this.logoutURLFormat) !== -1) {
				this.storage.clear(); 
				browser.close();
			}
		});
	}

}
