import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryCardPage } from './summary-card';
import { GraphBulletPageModule } from '../graph-bullet/graph-bullet.module';
import { GraphBardashPageModule } from '../graph-bardash/graph-bardash.module';

@NgModule({
  declarations: [
    SummaryCardPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryCardPage),
    GraphBulletPageModule,
    GraphBardashPageModule
  ],
  exports: [
    SummaryCardPage
  ]
})
export class SummaryCardPageModule {}
