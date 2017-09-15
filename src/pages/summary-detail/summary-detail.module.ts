import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryDetailPage } from './summary-detail';

import { GraphBulletPageModule } from '../graph-bullet/graph-bullet.module';

@NgModule({
  declarations: [
    SummaryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryDetailPage),
  ],
  exports:[SummaryDetailPage]
})
export class SummaryDetailPageModule {}
