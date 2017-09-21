import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
// import { DataProvider } from '../../providers/data/data';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
  ],
  exports: [AboutPage],
  //providers: [DataProvider]
})
export class AboutPageModule {}
