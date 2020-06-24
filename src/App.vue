<template>
   
  <div id="app" >
     <div v-show="loader" class="loader">Loading...</div>   

    <div id="header" class="header" v-show="!loader">
     <div class="container" style="display: table">
        <div class="left-side">
            <div>
                Diversity By Berk Açıkel
            </div>
        </div>
        <div class="right-side">
        <div>
          <multiselect @input="changeCompany" v-model="value" :options="options" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Select Company"></multiselect>
        </div>
        </div>
    </div>
</div>
    <div class="container" v-show="!loader">
    <div class="row main_box">
        <div class="card_header">
            <h4>{{company_name}}</h4>
        </div>
        <div class="card_body">
            <div class="row">
                <div class="col-md-3">
                    <div class="widget">
                        <div class="widget_main">
                            <div class="widget_left">
                                <i class="fas fa-user-alt widget_icon"></i>
                            </div>
                            <div class="widget_right">
                                <h5> {{total_employee}} </h5>
                                <span style="font-size: 13px;font-weight: 400;">Total Employees</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(item, index) in company_properties" :key="index" class="col-md-3" >
                    <div class="widget">
                        <div class="widget_main">
                            <div class="widget_left">
                                <i class="fas fa-laptop widget_icon" v-if="index == 0"></i>
                                <i class="fas fa-building widget_icon" v-if="index == 1"></i>
                            </div>
                            <div class="widget_right">
                                <h5>{{item[index]}}</h5>
                                <span style="font-size: 13px;font-weight: 400;">Company Values</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="widget">
                        <div class="widget_main">
                            <div class="widget_left">
                                <i class="fas fa-plane-arrival widget_icon"></i>
                            </div>
                            <div class="widget_right">
                                <h5>{{company_vacation}}</h5>
                                <span style="font-size: 13px;font-weight: 400;">Vacation Policy</span>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- widget end -->


                <div class="col-md-6">
                <div class="chart_card">
                    <div class="card_header">
                        <h4>Age</h4>
                    </div>
                    <div class="card_body">
                        <div id="ageChart"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="chart_card">
                    <div class="card_header">
                        <h4>Has a Disability</h4>
                    </div>
                    <div class="card_body">
                        <div id="hasDisabilityChart"></div>
                    </div>
                </div>
            </div>

             <div class="col-md-12">
                 <div class="chart_card">
                    <div class="card_header">
                        <h4>Ethnicity</h4>
                    </div>
                    <div class="card_body">
                        <div id="EtnicityLineChart"></div>
                    </div>
                </div>
             </div>

             <div class="col-md-6">
                 <div class="chart_card">
                    <div class="card_header">
                        <h4>LGBTQIA+</h4>
                    </div>
                    <div class="card_body">
                        <div id="LGBTQIAChart"></div>
                    </div>
                </div>
             </div>

            <div class="col-md-6">
                 <div class="chart_card">
                    <div class="card_header">
                        <h4>Non-Native English Speaker</h4>
                    </div>
                    <div class="card_body">
                        <div id="NonNativeESChart"></div>
                    </div>
                </div>
             </div>

             <div class="col-md-12">
                 <div class="chart_card">
                    <div class="card_header">
                        <h4>Location</h4>
                    </div>
                    <div class="card_body">
                        <div id="LocationsLineChart"></div>
                    </div>
                </div>
             </div>

             <div class="col-md-12">
                 <div class="chart_card">
                    <div class="card_header">
                        <h4>Family Status</h4>
                    </div>
                    <div class="card_body">
                        <div id="FamilyStatusLineChart"></div>
                    </div>
                </div>
             </div>
            </div>
        </div>
    </div>
</div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import './assets/main.css';


export default {
  name: 'App',
  components: {
    Multiselect
  },
  data() {
    return{
    items:[],
    company_items: undefined,
    total_employee: 0,
    company_name: "",
    value: "",
    option: "",
    options: [],
    company_vacation:"",
    company_properties: [],
    loader: true,
    }
},
    methods:{
        changeCompany(){
            console.log(this.value);

            for (var i =0;i < this.items.length;i++) {
                if (this.items[i].Name === this.value){
                    this.company_items = this.items[i];
                    this.company_name = this.company_items.Name;
                    this.total_employee = this.company_items.TotalEmployee;
                    this.company_vacation = this.company_items.Vacation;
                    this.company_properties = []
                    for(i = 0;i < this.company_items.CompanyProperties.length;i++){
                    this.company_properties.push(this.company_items.CompanyProperties)
                    }
                }
            }
        }
    },
             created(){

                axios({
              url: 'https://api.airtable.com/v0/appdgoj7d38cDKOyt/Table%201',
              headers: {
                'Authorization': 'Bearer ******'
              }
            }).then((res) => {
                for(var i=0;i<res.data.records.length;i++) {
                        this.items.push(res.data.records[i].fields);
                        this.options.push(res.data.records[i].fields.Name);
                }

                //take first one company
                this.company_items = this.items[1];
                this.total_employee = this.company_items.TotalEmployee;
                this.company_name = this.company_items.Name;
                this.company_vacation = this.company_items.Vacation;
                  for(i = 0;i < this.company_items.CompanyProperties.length;i++){
                  this.company_properties.push(this.company_items.CompanyProperties)
                }
                
              // res.data.records
            });

            
         },
         mounted(){
         },
              watch:{
         company_items:function(){
                this.loader = false;

                var age_data_raw = this.company_items.Age;
                var age_data = age_data_raw.split(",");

                var chart = am4core.create("ageChart", am4charts.PieChart);
                // Add data
                chart.data = [{
                  "age": "15-24",
                  "value": 0
                }, {
                  "age": "25-34",
                  "value": 0
                }, {
                  "age": "35-50",
                  "value": 0
                }];

               for (var i = 0; i < chart.data.length; i++) {
                   chart.data[i]['value'] = age_data[i];
               }


                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "value";
                pieSeries.dataFields.category = "age";

                // Let's cut a hole in our Pie chart the size of 40% the radius
                chart.innerRadius = am4core.percent(40);

                // Put a thick white border around each Slice
                pieSeries.slices.template.stroke = am4core.color("#4a2abb");
                pieSeries.slices.template.strokeWidth = 2;
                pieSeries.slices.template.strokeOpacity = 1;
                pieSeries.ticks.template.disabled = true;
                pieSeries.alignLabels = false;
                pieSeries.labels.template.text = "";

                chart.legend = new am4charts.Legend();
                chart.legend.layout = "vertical";


                //Has disability chart



                var disabilitychart = am4core.create("hasDisabilityChart", am4charts.PieChart);
                disabilitychart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                disabilitychart.data = [
                  {
                    category: "Total Employees",
                    value: this.total_employee
                  },
                  {
                    category: "Has Disability",
                    value: this.company_items.Disability
                  },
                ];
                disabilitychart.radius = am4core.percent(70);
                disabilitychart.innerRadius = am4core.percent(40);
                disabilitychart.startAngle = 180;
                disabilitychart.endAngle = 360;



                var series = disabilitychart.series.push(new am4charts.PieSeries());
                series.dataFields.value = "value";
                series.dataFields.category = "category";

                series.slices.template.cornerRadius = 10;
                series.slices.template.innerCornerRadius = 7;
                series.slices.template.draggable = true;
                series.slices.template.inert = true;
                series.alignLabels = false;
                series.ticks.template.disabled = true;
                series.labels.template.text = "";



                series.hiddenState.properties.startAngle = 90;
                series.hiddenState.properties.endAngle = 90;

                disabilitychart.legend = new am4charts.Legend();
                disabilitychart.legend.layout = "vertical";


                // Ethnicity Line Chartt

                var ethnicity_data_raw = this.company_items.Ethnicity;
                var ethnicity_data = ethnicity_data_raw.split(",");

                 var EtnicityLineChart = am4core.create("EtnicityLineChart", am4charts.XYChart);

                    EtnicityLineChart.data = [{
                     "category": "White",
                     "value": 0
                    }, {
                     "category": "Hispanic/Latinx",
                     "value": 0
                    }, {
                     "category": "East Asian",
                     "value": 0
                    }, {
                     "category": "Black/African Descent",
                     "value": 0
                    }, {
                     "category": "Southeast Asian",
                     "value": 0
                    }, {
                     "category": "South Asian",
                     "value": 0
                    }, {
                     "category": "Native American",
                     "value": 0
                    }];

                    // push formatted data to chart
                    for ( i = 0; i < EtnicityLineChart.data.length; i++) {
                    EtnicityLineChart.data[i]['value'] = ethnicity_data[i];
                    }

                    EtnicityLineChart.padding(40, 40, 40, 40);


                    var categoryAxis = EtnicityLineChart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.renderer.grid.template.location = 0;
                    categoryAxis.dataFields.category = "category";
                    categoryAxis.renderer.minGridDistance = 60;
                    categoryAxis.renderer.inversed = true;
                    categoryAxis.renderer.grid.template.disabled = true;
                    categoryAxis.renderer.hideOversized  = true;
                    categoryAxis.renderer.labels.template.wrap = true;
                    categoryAxis.renderer.labels.template.maxWidth = 150;

                    var valueAxis = EtnicityLineChart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.min = 0;
                    valueAxis.extraMax = 0.1;
                    //valueAxis.rangeChangeEasing = am4core.ease.linear;
                    //valueAxis.rangeChangeDuration = 1500;

                    series = EtnicityLineChart.series.push(new am4charts.ColumnSeries());
                    series.dataFields.categoryX = "category";
                    series.dataFields.valueY = "value";
                    series.tooltipText = "{valueY.value}"
                    series.columns.template.strokeOpacity = 0;
                    series.columns.template.column.cornerRadiusTopRight = 10;
                    series.columns.template.column.cornerRadiusTopLeft = 10;
                    //series.interpolationDuration = 1500;
                    //series.interpolationEasing = am4core.ease.linear;
                    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
                    labelBullet.label.verticalCenter = "bottom";
                    labelBullet.label.dy = -10;
                    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
                    labelBullet.label.hideOversized = true;


                    EtnicityLineChart.zoomOutButton.disabled = true;

                    categoryAxis.sortBySeries = series;



                    // LGBTQIA+ Chart



                    var lgbtqia = am4core.create("LGBTQIAChart", am4charts.PieChart);
                    lgbtqia.hiddenState.properties.opacity = 0; // this creates initial fade-in

                    lgbtqia.data = [
                      {
                        category: "Total Employees",
                        value: this.total_employee
                      },
                      {
                        category: "LGBTQIA+",
                        value: this.company_items.LGBTQIA
                      },
                    ];
                    lgbtqia.radius = am4core.percent(70);
                    lgbtqia.innerRadius = am4core.percent(40);
                    lgbtqia.startAngle = 180;
                    lgbtqia.endAngle = 360;

                    series = lgbtqia.series.push(new am4charts.PieSeries());
                    series.dataFields.value = "value";
                    series.dataFields.category = "category";

                    series.slices.template.cornerRadius = 10;
                    series.slices.template.innerCornerRadius = 7;
                    series.slices.template.draggable = true;
                    series.slices.template.inert = true;
                    series.alignLabels = false;
                    series.labels.template.text = "";


                    series.hiddenState.properties.startAngle = 90;
                    series.hiddenState.properties.endAngle = 90;

                    lgbtqia.legend = new am4charts.Legend();
                    lgbtqia.legend.layout = "vertical";



                    // Non-Native English Speaker


                    var nonNativeEnglishSpeaker = am4core.create("NonNativeESChart", am4charts.PieChart);
                    nonNativeEnglishSpeaker.hiddenState.properties.opacity = 0; // this creates initial fade-in

                    nonNativeEnglishSpeaker.data = [
                      {
                        category: "Total Employees",
                        value: this.total_employee
                      },
                      {
                        category: "Non-Native English Speaker",
                        value: this.company_items.NonNativeEnglishSpeaker
                      },
                    ];
                    nonNativeEnglishSpeaker.radius = am4core.percent(70);
                    nonNativeEnglishSpeaker.innerRadius = am4core.percent(40);
                    nonNativeEnglishSpeaker.startAngle = 180;
                    nonNativeEnglishSpeaker.endAngle = 360;

                    series = nonNativeEnglishSpeaker.series.push(new am4charts.PieSeries());
                    series.dataFields.value = "value";
                    series.dataFields.category = "category";

                    series.slices.template.cornerRadius = 10;
                    series.slices.template.innerCornerRadius = 7;
                    series.slices.template.draggable = true;
                    series.slices.template.inert = true;
                    series.alignLabels = false;
                    series.labels.template.text = "";

                    series.hiddenState.properties.startAngle = 90;
                    series.hiddenState.properties.endAngle = 90;


                    nonNativeEnglishSpeaker.legend = new am4charts.Legend();
                    nonNativeEnglishSpeaker.legend.layout = "vertical";

                    //Locations Line Chart


                    var Locations_data_raw = this.company_items.Location;
                    var Locations_data = Locations_data_raw.split(",");

                    var LocationsLineChart = am4core.create("LocationsLineChart", am4charts.XYChart);

                    LocationsLineChart.data = [{
                     "category": "North America",
                     "value": 0
                    }, {
                     "category": "Europe",
                     "value": 0
                    }, {
                     "category": "Asia",
                     "value": 0
                    }, {
                     "category": "Nomad",
                     "value": 0
                    }, {
                     "category": "Central or South America",
                     "value": 0
                    }, {
                     "category": "Australasia",
                     "value": 0
                    }, {
                     "category": "Africa",
                     "value": 0
                    }];

                    // push formatted data to chart
                    for ( i = 0; i < LocationsLineChart.data.length; i++) {
                    LocationsLineChart.data[i]['value'] = Locations_data[i];
                    }

                    LocationsLineChart.padding(40, 40, 40, 40);

                    categoryAxis = LocationsLineChart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.renderer.grid.template.location = 0;
                    categoryAxis.dataFields.category = "category";
                    categoryAxis.renderer.minGridDistance = 60;
                    categoryAxis.renderer.inversed = true;
                    categoryAxis.renderer.grid.template.disabled = true;
                    categoryAxis.renderer.labels.template.wrap = true;
                    categoryAxis.renderer.labels.template.maxWidth = 150;


                    valueAxis = LocationsLineChart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.min = 0;
                    valueAxis.extraMax = 0.1;
                    //valueAxis.rangeChangeEasing = am4core.ease.linear;
                    //valueAxis.rangeChangeDuration = 1500;

                    series = LocationsLineChart.series.push(new am4charts.ColumnSeries());
                    series.dataFields.categoryX = "category";
                    series.dataFields.valueY = "value";
                    series.tooltipText = "{valueY.value}"
                    series.columns.template.strokeOpacity = 0;
                    series.columns.template.column.cornerRadiusTopRight = 10;
                    series.columns.template.column.cornerRadiusTopLeft = 10;
                    //series.interpolationDuration = 1500;
                    //series.interpolationEasing = am4core.ease.linear;
                    labelBullet = series.bullets.push(new am4charts.LabelBullet());
                    labelBullet.label.verticalCenter = "bottom";
                    labelBullet.label.dy = -10;
                    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

                    LocationsLineChart.zoomOutButton.disabled = true;

                    categoryAxis.sortBySeries = series;


                    // Family Status Line Chart


                    var family_status_data_raw = this.company_items.FamilyStatus;
                    var family_status_data = family_status_data_raw.split(",");

                    var FamilyStatusLineChart = am4core.create("FamilyStatusLineChart", am4charts.XYChart);

                    FamilyStatusLineChart.data = [{
                     "category": "No Children",
                     "value": 0
                    }, {
                     "category": "Partnered Parent",
                     "value": 0
                    }, {
                     "category": "Unknown",
                     "value": 0
                    }];

                    // push formatted data to chart
                    for (i = 0; i < FamilyStatusLineChart.data.length; i++) {
                    FamilyStatusLineChart.data[i]['value'] = family_status_data[i];
                    }

                    FamilyStatusLineChart.padding(40, 40, 40, 40);

                    categoryAxis = FamilyStatusLineChart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.renderer.grid.template.location = 0;
                    categoryAxis.dataFields.category = "category";
                    categoryAxis.renderer.minGridDistance = 60;
                    categoryAxis.renderer.inversed = true;
                    categoryAxis.renderer.grid.template.disabled = true;

                    valueAxis = FamilyStatusLineChart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.min = 0;
                    valueAxis.extraMax = 0.1;
                    //valueAxis.rangeChangeEasing = am4core.ease.linear;
                    //valueAxis.rangeChangeDuration = 1500;

                    series = FamilyStatusLineChart.series.push(new am4charts.ColumnSeries());
                    series.dataFields.categoryX = "category";
                    series.dataFields.valueY = "value";
                    series.tooltipText = "{valueY.value}"
                    series.columns.template.strokeOpacity = 0;
                    series.columns.template.column.cornerRadiusTopRight = 10;
                    series.columns.template.column.cornerRadiusTopLeft = 10;
                    //series.interpolationDuration = 1500;
                    //series.interpolationEasing = am4core.ease.linear;
                    labelBullet = series.bullets.push(new am4charts.LabelBullet());
                    labelBullet.label.verticalCenter = "bottom";
                    labelBullet.label.dy = -10;
                    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

                    FamilyStatusLineChart.zoomOutButton.disabled = true;

                    categoryAxis.sortBySeries = series;


         }
              }

}

</script>

<style>
#app {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #f6f8fb;
}

</style>
