import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelCardPage } from './channel-card';
import { GraphBulletPageModule } from '../../graphs/graph-bullet/graph-bullet.module';
import { GraphDonutPageModule } from '../../graphs/graph-donut/graph-donut.module';

@NgModule({
  declarations: [
    ChannelCardPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelCardPage),
    GraphBulletPageModule,
    GraphDonutPageModule,
  ],
  exports: [ChannelCardPage]
})
export class ChannelCardPageModule {}
