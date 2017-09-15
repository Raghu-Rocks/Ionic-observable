import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GraphBulletPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'bullet',
  templateUrl: 'graph-bullet.html',
})
export class GraphBulletPage  implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('bulletwrapper') container: any;
  @Input('colors') colors: any[];
  @Input('height') height: number; //pixels
  @Input('actual') actual: number[];
  @Input('target') target: number[];
  @Input('ranges') ranges: number[];
  @Input('rounded') rounded: boolean;

  calc_height: number = 0;
  actual_height: number = 0;
  actual_top: number = 0;

  calc_ranges: number[] = [];
  calc_actual: number[] = [];
  calc_target: number = 0;

  showTarget: boolean = false;
  showRange: boolean = false;

  color_array: any[] = ['lightgrey', 'slateblue', 'blueviolet'];

  range_opacity: any[] = [];
  actual_opacity: any[] = [];
  viewInit: boolean = false;

  border_radius: number = 0;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
      //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
      //Add 'implements OnChanges' to the class.
      if (this.viewInit) {
          let self = this;
          setTimeout(() => { self.processData() }, 100);
      }
  }

  ngAfterViewInit() {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.viewInit = true;
      let self = this;
      setTimeout(() => { self.processData() }, 100);
  }

  ngOnDestroy() {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.

  }

  processData() {
      this.setColors();
      this.calculateHeights();
      let act_max: number = Number.MIN_VALUE;
      let range_max: number = Number.MIN_VALUE;
      let target_max: number = Number.MIN_VALUE;
      let max: number = Number.MIN_VALUE;
      let min: number = Math.min(Math.min(...this.actual), Math.min(...this.ranges), Math.min(...this.target));
      min = min < 0 ? min : 0;
      let self = this;

      if (this.actual) {
          this.actual = this.checkForNegatives(this.actual, min);
          act_max = Math.max(...this.actual);
      }
      if (this.ranges) {
          this.ranges = this.checkForNegatives(this.ranges, min);
          range_max = Math.max(...this.ranges);
      }
      if (this.target) {
          this.target = this.checkForNegatives(this.target, min);
          target_max = Math.max(...this.target);
      }
      max = Math.max(act_max, range_max, target_max);

      if (this.target && this.target.length > 0) {
          this.calc_target = target_max / max * 100;
          this.showTarget = true;
      }

      if (this.actual && this.actual.length > 0) {
          this.actual.forEach((item) => {
              this.calc_actual.push((item / max) * 100)
          });
          this.calc_actual.sort((a, b) => { return a - b });
          this.addActualOpacity();
      }

      if (this.ranges && this.ranges.length > 0) {
          this.ranges.forEach((item) => {
              this.calc_ranges.push((item / max) * 100)
          });
          this.calc_ranges.sort((a, b) => { return a - b });
          this.addRangeOpacity();
          this.showRange = true;
      }

  }

  checkForNegatives(array: number[], min){
      //let min = Math.min(...array) < 0 ? Math.min(...array) : 0;
      return array.map(item => {
          return item - min;
      });
  }


  addRangeOpacity() {
      let num = this.calc_ranges.length;
      while (num > 0) {
          this.range_opacity.push(1 / num);
          num--;
      }
      this.range_opacity.reverse();

  }
  addActualOpacity() {
      let num = this.calc_actual.length;
      while (num > 0) {
          this.actual_opacity.push(1 / num);
          num--;
      }
      this.actual_opacity.reverse();
  }
  calculateHeights() {
      if (this.height) {
          this.calc_height = Math.round(this.height);
      }
      this.actual_height = this.calc_height / 2;
      this.actual_top = this.actual_height / 2;
      if(this.rounded){
        this.border_radius = this.calc_height;
      }
  }

  setColors() {
      if (this.colors && this.colors.length === 3) {
          this.color_array = this.colors;
      }
  }

}

