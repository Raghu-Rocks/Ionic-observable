import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { C3ServiceProvider, D3, C3 } from '../c3-service/c3-service';
/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
declare var d3: any;
@Injectable()
export class UtilsProvider {
  public kformat = d3.format('.3s');
  private donut_color_map = [
    '#d5406a',
    '#0d6580',
    '#21daa0',
    '#d3885f',
    '#0b94ff'
  ];
  constructor(public http: Http) {
    console.log('Hello UtilsProvider Provider');
  }

  getColor(key: number){
    if(key < this.donut_color_map.length){
      return this.donut_color_map[key];
    }
  }

  getKFormatted(num: any){
    if(isNaN(num)){
      return num;
    }
    return this.kformat(num);
  }



}
