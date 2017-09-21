import { Component, Input, ViewChild, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { C3ServiceProvider, C3, D3 } from '../../../providers/c3-service/c3-service';
/**
 * Generated class for the GraphLinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'graph-line',
  templateUrl: 'graph-line.html',
})
export class GraphLinePage implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('chart') chart;
  @Input('card') card;
  private c3: C3;
  private d3: D3;
  viewInit: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private c3Service: C3ServiceProvider) {
    this.c3 = c3Service.getC3();
    this.d3 = c3Service.getD3();
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.viewInit){
      if(typeof changes.card !== 'undefined'){
        this.generateChart();
      }
    }

  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.viewInit = true;
    this.generateChart();
  }

  generateChart() {
    if (!this.card) {
      return;
    }
    console.log(this.card);
    let self = this;
    let colors: any[] = ['green', 'orange'];
    let bar_width = this.chart.nativeElement.offsetWidth;
    let bar_height = bar_width;
    let xlabels = this.card['line_one_xlabel'].slice(0);
    let line_one = this.card['line_one_data'].slice(0);
    let line_two = this.card['line_two_data'].slice(0);
    let labels = this.card['labels'].slice(0);
    let formatter: any = this.card.getFormatter();
    line_one.unshift('Actual');
    line_two.unshift('Target');
    let options: any = {
      // bindto: "." + self.barclass + "-bar",
      bindto: this.chart.nativeElement,
      zoom: {
        enabled: false,
        //rescale: true,
      },
      transition: {
        duration: 100
      },
      color: {
        pattern: colors
      },
      legend: {
        show: false
      },
      size: {
        height: bar_height,
        width: bar_width
      },
      data: {
        columns: [line_two, line_one],
        axes: {
          // Cost: 'y',
          // 'CPC': 'y2'
        },
        type: 'line',
        types: {
          // 'CPC': 'line',
          // CTR: 'line',
          // CPQ: 'line'
        },
        labels: false
      },

      axis: {

        x: {
          min: 0,
          padding:{
            left: 0,
            right: 0
          },
          type: 'category',
          //type: 'timeseries',
          tick: {
            fit: true,
            centered: true,
            culling: {
              //max: 5
            },
            multiline: false,
            format: function (x) {
              return x;//self.util.formatXaxis(xlabels[x + 1], slug)
            }

            //format: '%b-%d',

          }
        },
        y: {
          min: 0,
          show: true,
          padding: {
            bottom: 0
          },
          tick: {
            format: formatter // ADD
            //count: 5
          }
        },
      },
      grid: {
        y: {
          show: true
        },
        x: {
          show: true
        }
      },

      point: {
        r: 3,
        focus: {
          expand: {
            r: 4.5
          }
        }
      }
      // ,

      // onresized: function () {
      //   let o = self.chartObj;
      //   let el = self.parentNativeElement.childNodes[0];
      //   // debugger;
      //   this.api.resize({   //this is the context of c3 and with that all c3 apis are available
      //     width: el.offsetWidth
      //     // height: el.offsetHeight
      //   });
      // }

    };

    let graph = this.c3.generate(options);
  }

}
