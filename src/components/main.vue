<template>
<div>
    <div id="header" class="header">
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
    <div class="container">
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
                                <h5>{{ total_employee }}</h5>
                                <span style="font-size: 13px;font-weight: 400;">Total Employees</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="widget">
                        <div class="widget_main">
                            <div class="widget_left">
                                <i class="fas fa-laptop widget_icon"></i>
                            </div>
                            <div class="widget_right">
                                <h5>Remote Ok</h5>
                                <span style="font-size: 13px;font-weight: 400;">Company Values</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="widget">
                        <div class="widget_main">
                            <div class="widget_left">
                                <i class="fas fa-building widget_icon"></i>
                            </div>
                            <div class="widget_right">
                                <h5>B2C</h5>
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
                                <h5>Unlimited</h5>
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



export default {
     components: {Multiselect: window.VueMultiselect.default },
        data: {
    },
    methods:{

},
    created(){

       

    },



}
</script>