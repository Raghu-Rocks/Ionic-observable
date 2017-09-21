import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelCardPage } from './channel-card';
import { GraphBulletPageModule } from '../graph-bullet/graph-bullet.module';
import { GraphDonutPageModule } from '../graph-donut/graph-donut.module';
import {ChannelDetailPageModule} from '../channel-detail/channel-detail.module';

@NgModule({
  declarations: [
    ChannelCardPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelCardPage),
    GraphBulletPageModule,
    GraphDonutPageModule,
    ChannelDetailPageModule,
  ],
  exports: [ChannelCardPage]
})
export class ChannelCardPageModule {}
