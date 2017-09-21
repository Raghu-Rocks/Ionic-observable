import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareBulletPage } from './compare-bullet';
import { GraphBulletPageModule } from '../graph-bullet/graph-bullet.module';

@NgModule({
  declarations: [
    CompareBulletPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareBulletPage),
    GraphBulletPageModule
  ],
  exports:[CompareBulletPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class CompareBulletPageModule {}
