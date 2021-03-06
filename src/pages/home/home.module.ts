import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import {SummaryCardPageModule} from '../cards/summary-card/summary-card.module';
import {ChannelCardPageModule} from '../cards/channel-card/channel-card.module';

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage),
    SummaryCardPageModule, 
    ChannelCardPageModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule { }