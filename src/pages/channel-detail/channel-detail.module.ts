import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelDetailPage } from './channel-detail';
import { CompareBulletPageModule } from '../compare-bullet/compare-bullet.module';
@NgModule({
  declarations: [
    ChannelDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelDetailPage),
    CompareBulletPageModule
  ],
  exports: [ChannelDetailPage]
})
export class ChannelDetailPageModule {}
