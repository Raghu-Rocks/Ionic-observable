import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphLinePage } from './graph-line';

@NgModule({
  declarations: [
    GraphLinePage,
  ],
  imports: [
    IonicPageModule.forChild(GraphLinePage),
  ],
  exports: [GraphLinePage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class GraphLinePageModule {}
