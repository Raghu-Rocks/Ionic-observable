import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryDetailPage } from './summary-detail';
import { CompareBulletPageModule } from '../../graphs/compare-bullet/compare-bullet.module';
import { GraphLinePageModule } from '../../graphs/graph-line/graph-line.module';

@NgModule({
  declarations: [
    SummaryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryDetailPage),
    CompareBulletPageModule,
    GraphLinePageModule
  ],
  exports:[SummaryDetailPage]
})
export class SummaryDetailPageModule {}
