import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { C3ServiceProvider, C3, D3 } from '../../providers/c3-service/c3-service';

/**
 * Generated class for the GraphDonutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'donut',
  templateUrl: 'graph-donut.html',
})
export class GraphDonutPage implements OnInit, AfterViewInit, OnChanges{
  @Input('data') data: any[];
  @Input('colors') colors: any[];
  @ViewChild('donut') donutView: any;
  
  private c3: C3;
  private d3: D3;
  viewInit: boolean = false;
  donutDataArray: any[] = [];
  color_pattern: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, c3Service: C3ServiceProvider) {
    this.c3 = c3Service.getC3();
    this.d3 = c3Service.getD3();
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setData();
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.viewInit && typeof changes.data !== 'undefined'){
      //this.setData();
      this.donutChart();
    }
    
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.viewInit = true;
    this.donutChart();
    
  }

  ionViewDidLoad() {
  }

  setData(){
    if(this.data){
      this.donutDataArray = this.data;
    }
    if(this.colors){
      this.color_pattern = this.colors;
    }
  }
  donutChart() {
    this.setData();
    let d_width = this.donutView.nativeElement.offsetWidth;
    let d_height = d_width*0.8;
    let c3 = this.c3;
    let options: any = {
      bindto: this.donutView.nativeElement,
      data: {
        type: 'donut',
        columns: this.donutDataArray,
      },
      legend: {
        show: false
      },
      size: {
        height: d_height,
        width: d_width
      },
      donut: {
        label: {
          threshold: 0.1
        },
        width: 15
      }
    };

    if(this.color_pattern && this.color_pattern.length > 0){
      options['color']= {};
      options['color']['pattern'] = this.color_pattern;
    }

    if(this.donutView){
      c3.generate(options);
    }

    
  }
}
