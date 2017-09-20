import { Component, Input, OnInit, AfterViewInit, AfterViewChecked, SimpleChanges, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GraphBardashPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var d3: any;
@IonicPage()
@Component({
  selector: 'barchart',
  templateUrl: 'graph-bardash.html',
})
export class GraphBardashPage {
  @Input('formatter') formatter: any;
  @Input('bardata') bardata: number[];
  @Input('dashdata') dashdata: number[];
  @Input('xlabels') xLabels: string[];
  @Input('colors') colors: string[];
  @Input('bgColor') bgColor: string;
  @Input('xLabelCol') xLabelCol: string;

  private kformat = d3.format('.2s');

  barWidth: number = 0;
  barHeight: number[] = [];
  dashHeight: number[] = [];
  chart_colors: string[] = ['orange', 'green'];
  viewInit: boolean = false;
  height = 50;
  labels: any[] = [];
  barData: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    if (this.viewInit) {
      let self = this;
      setTimeout(() => { self.processData(); }, 100);
    }

  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.viewInit = true;
    let self = this;
    setTimeout(() => { self.processData(); }, 100);

  }

  processData() {
    this.setColors();
    this.setWidth();
    if (this.xLabels) {
      this.labels = this.xLabels;
    }
    let self = this;
    let max: number = Math.max(Math.max(...this.bardata), Math.max(...this.dashdata));
    if (this.bardata) {
      this.bardata = this.checkForNegatives(this.bardata, Math.min(...this.bardata));
      this.bardata.forEach(item => {
        if(self.formatter){
          this.barData.push(self.formatter(item));
        }
        else if (isNaN(item)) {
          this.barData.push(item);
        } else {
          this.barData.push(this.kformat(item));
        }

        self.barHeight.push((item / max) * 100);
      });
    }

    if (this.dashdata) {
      this.bardata = this.checkForNegatives(this.dashdata, Math.min(...this.dashdata));

      this.dashdata.forEach(item => {
        self.dashHeight.push((1 - item / max) * 100);
      });
    }

  }

  checkForNegatives(array: number[], min) {
    min = min < 0 ? min : 0;
    return array.map(item => {
      return item - min;
    });
  }

  setWidth() {
    if (this.bardata && this.bardata.length > 0) {
      this.barWidth = (1 / this.bardata.length) * 99;
    }
  }

  setColors() {
    if (this.colors && this.colors.length === 2) {
      this.chart_colors = this.colors;
    }
  }

}
