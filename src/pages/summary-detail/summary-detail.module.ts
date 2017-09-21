import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryDetailPage } from './summary-detail';
import { CompareBulletPageModule } from '../compare-bullet/compare-bullet.module';
import { GraphLinePageModule } from '../graph-line/graph-line.module';
//import { AboutPageModule } from '../about/about.module';

@NgModule({
  declarations: [
    SummaryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryDetailPage),
    //AboutPageModule,
    CompareBulletPageModule,
    GraphLinePageModule
  ],
  exports:[SummaryDetailPage]
})
export class SummaryDetailPageModule {}
