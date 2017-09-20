import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import {SummaryCardPageModule} from '../summary-card/summary-card.module';
import {ChannelCardPageModule} from '../channel-card/channel-card.module';
import { AboutPageModule } from '../about/about.module';

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage),
    AboutPageModule,
    SummaryCardPageModule, 
    ChannelCardPageModule],
  exports: [
    HomePage
  ]
})
export class HomePageModule { }