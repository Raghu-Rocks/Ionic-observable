import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphDonutPage } from './graph-donut';

@NgModule({
  declarations: [
    GraphDonutPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphDonutPage),
  ],
  exports: [GraphDonutPage]
})
export class GraphDonutPageModule {}
