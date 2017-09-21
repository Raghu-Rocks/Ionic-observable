import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphBulletPage } from './graph-bullet';

@NgModule({
  declarations: [
    GraphBulletPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphBulletPage),
  ],
  exports: [GraphBulletPage]
})
export class GraphBulletPageModule {}
