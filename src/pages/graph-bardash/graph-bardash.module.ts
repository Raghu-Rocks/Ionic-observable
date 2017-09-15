import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphBardashPage } from './graph-bardash';

@NgModule({
  declarations: [
    GraphBardashPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphBardashPage),
  ],
  exports: [GraphBardashPage]
})
export class GraphBardashPageModule {}
