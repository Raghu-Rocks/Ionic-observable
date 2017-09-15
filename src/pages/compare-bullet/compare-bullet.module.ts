import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareBulletPage } from './compare-bullet';

@NgModule({
  declarations: [
    CompareBulletPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareBulletPage),
  ],
  exports:[CompareBulletPage]
})
export class CompareBulletPageModule {}
