import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelDetailPage } from './channel-detail';

@NgModule({
  declarations: [
    ChannelDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelDetailPage),
  ],
  exports: [ChannelDetailPage]
})
export class ChannelDetailPageModule {}
