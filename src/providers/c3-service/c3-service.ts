import { Injectable } from '@angular/core';
import D3JS from 'd3';
import C3JS from 'c3';

export type C3 = typeof C3JS;
export type D3 = typeof D3JS;

/*
  Generated class for the C3ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class C3ServiceProvider {
  private expandedChartRef: any;
  private searchBarRef: any;
  private socialBarRef: any;
  private displayBarRef: any;

  private barRefs = {};


  constructor() { }

  public getC3(): C3{
    return C3JS;
  }

  public getD3(): D3{
    return D3JS;
  }

  public setBarRefs(key:string, ref:any){
    this.barRefs[key] = ref;
  }

  public getBarRef(key:string){
    return this.barRefs[key];
  }

  public setExpandedChartRef(ref: any){
      this.expandedChartRef = ref;
  }

  public getExpandedChartRef(){
      return this.expandedChartRef;
  }

  public setSearchBarRef(ref: any){
      this.searchBarRef = ref;
  }

  public getSearchBarRef(){
      return this.searchBarRef;
  }

  public setSocialBarRef(ref: any){
      this.socialBarRef = ref;
  }

  public getSocialBarRef(){
      return this.socialBarRef;
  }

  public setDisplayBarRef(ref: any){
      this.displayBarRef = ref;
  }

  public getDisplayBarRef(){
      return this.displayBarRef;
  }

}
