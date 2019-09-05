document.addEventListener("DOMContentLoaded", init, false);

var home = 1;
var outdoor = 0;
var pub = 0;


var cell_edge_add =1;
var cell_center_add = 1;

var color_change = 0;

var ifb0 = [];
var ifb0_time_point = 1;

var ifb1 = [];
var ifb1_time_point = 1;

var enp0s8 = [];
var enp0s8_time_point = 1;

var enp0s9 = [];
var enp0s9_time_point = 1;

var enp0s10 = [];
var enp0s10_time_point = 1;
 
var zero_vec = [];
var zero_time_point = 1;

var xVal = 0;
var yVal = 100; 
var updateInterval = 1000; // 1 second
var dataLength = 30; 	   // number of dataPoints visible at any point

function init()
{
    setInterval( function() { getRxBytes("ifb0"); }, 1000 );
    setInterval( function() { getRxBytes("ifb1"); }, 1000 );
    setInterval( function() { getRxBytes("enp0s8"); }, 1000 );
    setInterval( function() { getRxBytes("enp0s9"); }, 1000 );
    setInterval( function() { getRxBytes("enp0s10"); }, 1000 );
}

function getRxBytes(iface) 
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
	
    	if (xhttp.readyState == 4){// && xhttp.status == 200) {
		if( xhttp.status ==0 || xhttp.status ==200){
      		
			var value = parseFloat(this.responseText)/1000000;
		
			if(iface == "ifb0"){
				if(color_change)
				{
					ifb0.push({
						x: ifb0_time_point,
						y: value,
						lineColor: "#124191",
						markerColor: "#124191"				
					});
					zero_vec.push({x:zero_time_point, y:0, lineColor: "#4BDD33", markerColor: "#4BDD33" });
				}
				else{
					ifb0.push({
						x: ifb0_time_point,
						y: value,
						lineColor: "#4BDD33",
						markerColor: "#4BDD33"
					});
					zero_vec.push({x:zero_time_point, y:0, lineColor: "#124191", markerColor: "#124191" });		
				}
				ifb0_time_point += 1;				
				zero_time_point += 1;	
			}
			if(iface == "ifb1"){
				if(color_change){
					ifb1.push({
						x: ifb1_time_point,
						y: value,
						lineColor: "#124191",
						markerColor: "#124191"						
					});
				}else{
					ifb1.push({
						x: ifb1_time_point,
						y: value,
						lineColor: "#4BDD33",
						markerColor: "#4BDD33"
					});
				}			
				ifb1_time_point+=1;		
			}	
			if(iface == "enp0s8"){				
				enp0s8.push({
					x: enp0s8_time_point,
					y: value
				});							
				enp0s8_time_point+=1;					
			}
			if(iface == "enp0s9"){
				if(color_change){
					enp0s9.push({
						x: enp0s9_time_point,
						y: value,
						markerColor: "#124191",
						lineColor: "#124191"
					});
				}else{	
					enp0s9.push({
						x: enp0s9_time_point,
						y: value,
						markerColor: "#4BDD33",
						lineColor: "#4BDD33"
					});
				}
				enp0s9_time_point+=1;		
			}
			if(iface == "enp0s10"){
				if(color_change)
				{
					enp0s10.push({
						x: enp0s10_time_point,
						y: value,
						markerColor: "#4BDD33",
						lineColor: "#4BDD33"
					});
				}
				else{
					enp0s10.push({
						x: enp0s10_time_point,
						y: value,
						markerColor: "#124191",
						lineColor: "#124191"
					});
				}
				enp0s10_time_point+=1;						
			}
		}
    	}
	else{
		//alert("error");
	}
    };
    
    var url = 'interfaces/'+iface+'_rx_bytes.txt';

   if(iface == "enp0s9"){
	url = 'interfaces/ifb2_rx_bytes.txt';
   }

    xhttp.open("GET", url, true);
    xhttp.send();
}

window.onload = function ()
{
    var rxBytes_enp0s8 = new CanvasJS.Chart("BELL_solution", {
	backgroundColor: "#FFFFFF",
	title :{
		//fontWeight: "bold",
		text: "Nokia Bell Labs solution"
	},
	axisY: {
		maximum: 16,
		minimum: 0,
		interval: 2,
		title: "Throughput (Mbps)",
		//titleFontColor: "#4F81BC",
		includeZero: false
	},   
	axisX: {
		title: "Time (s)",
		interval: 2,
		//labelAngle: 135,
		includeZero: false
	},
	legend:{
		verticalAlign: "bottom",
		fontSize: 21
	 },    
	data: [	{
		type: "line",
		name: "WiFi/DSL Multicast",
		showInLegend: true,
		lineColor: "#4BDD33",
		markerColor: "#4BDD33",
		markerSize: 12,
		color:"#4BDD33",
		dataPoints: enp0s9
	}/*,
	
	{
		type: "line",
		name: "4G Unicast",
		showInLegend: true,
		lineColor: "red",
		markerColor: "red",
		markerSize: 12,
		color: "red",
		dataPoints: enp0s8
	},

	{
		type: "line",
		name: "5G Multicast",
		showInLegend: true,
		lineColor: "blue",
		markerColor: "blue",
		markerSize: 12,
		color:"blue",
		dataPoints: enp0s10
	}*/]
    });

    var rxBytes_ifb0 = new CanvasJS.Chart("benchmark", {
	backgroundColor: "#FFFFFF",
	title :{
		//fontWeight: "bold",
		//fontFamily: "tahoma",
		text: "State of the art"
	},
	axisY: {
		maximum: 16,
		minimum: 0,
		interval: 2,
		title: "Throughput (Mbps)",
		//titleFontColor: "#4F81BC",
		includeZero: false
	},   
	axisX: {
		title: "Time (s)",
		interval: 2,
		includeZero: false
	},    
	legend:{
		verticalAlign: "bottom",
		fontSize: 21,
	}, 
	data: [{
		type: "line",
		name: "WiFi/DSL Multicast",
		showInLegend: true,
		lineColor: "#4BDD33",
		markerColor: "#4BDD33",
		markerSize: 12,
		color:"#4BDD33",
		dataPoints: ifb0
	}]
    });


    $('input[type="radio"]').click(function(){
	var scenario = $(this).val();
	if (scenario == "home"){

		//color_change = 0;
		/*// Nokia
		rxBytes_enp0s8.options.data[0].name = "WiFi";
		rxBytes_enp0s8.options.data[0].lineColor = "green";
		rxBytes_enp0s8.options.data[0].markerColor= "green";
		rxBytes_enp0s8.options.data[0].color ="green";
		
		// Benchmark
		//rxBytes_ifb0.options.data[0].name = "WiFi";
		//rxBytes_ifb0.options.data[0].lineColor = "green";
		//rxBytes_ifb0.options.data[0].markerColor= "green";
		//rxBytes_ifb0.options.data[0].color ="green";

		// Nokia
		rxBytes_enp0s8.options.data[2].name = "Multicast 5G";
		rxBytes_enp0s8.options.data[2].lineColor = "blue";
		rxBytes_enp0s8.options.data[2].markerColor= "blue";
		rxBytes_enp0s8.options.data[2].color ="blue";

		rxBytes_enp0s8.render();*/
	}
	else if (scenario == "cell_center" && cell_center_add){

		cell_center_add = 0;
		color_change = 1;

		// Nokia
		rxBytes_enp0s8.options.data[0].name = "5G Multicast";
		rxBytes_enp0s8.options.data[0].lineColor = "#124191";
		rxBytes_enp0s8.options.data[0].markerColor= "#124191";
		rxBytes_enp0s8.options.data[0].color ="#124191";


		enp0s8.push({
			x: enp0s8_time_point,
			y: 0,
			markerColor: "#00D2FF",
			lineColor: "#00D2FF"
		});
		enp0s8_time_point+=1;
		if (enp0s8.length > dataLength) {
			enp0s8.shift();
		}

		enp0s9.push({
			x: enp0s9_time_point,
			y: 0,
			markerColor: "#124191",
			lineColor: "#124191"
		});
		enp0s9_time_point+=1;
		if (enp0s9.length > dataLength) {
			enp0s9.shift();
		}

		enp0s10.push({
			x: enp0s10_time_point,
			y: 0,
			markerColor: "#124191",
			lineColor: "#124191"
		});
		enp0s10_time_point+=1;
		if (enp0s10.length > dataLength) {
			enp0s10.shift();
		}

		//rxBytes_enp0s8.options.data[2].name = "WiFi/DSL Multicast";
		//rxBytes_enp0s8.options.data[2].lineColor = "green";
		//rxBytes_enp0s8.options.data[2].markerColor= "green";
		//rxBytes_enp0s8.options.data[2].color ="green";

		// Benchmark
		rxBytes_ifb0.options.data[0].name = "5G Multicast";
		rxBytes_ifb0.options.data[0].lineColor = "#124191";
		rxBytes_ifb0.options.data[0].markerColor= "#124191";
		rxBytes_ifb0.options.data[0].color ="#124191";

		ifb0.push({
			x: ifb0_time_point,
			y: 0,
			markerColor: "#124191",
			lineColor: "#124191"
		});
		ifb0_time_point+=1;
		if (ifb0.length > dataLength) {
			ifb0.shift();
		}	

		ifb1.push({
			x: ifb1_time_point,
			y: 0,
			markerColor: "#124191",
			lineColor: "#124191"
		});
		ifb1_time_point+=1;
		if (ifb1.length > dataLength) {
			ifb1.shift();
		}

		zero_vec.push({
			x: zero_time_point,
			y: 0,
			markerColor: "#124191",
			lineColor: "#124191"
		});
		zero_time_point+=1;
		if (zero_vec.length > dataLength) {
			zero_vec.shift();
		}

		//rxBytes_ifb0.options.data[1].name = "5G Repair";
		//rxBytes_ifb0.options.data[1].lineColor = "blue";
		//rxBytes_ifb0.options.data[1].markerColor= "blue";
		//rxBytes_ifb0.options.data[1].color ="blue";

		var NokiaWifi = {
			type: "line",
			name: "DSL/WiFi Multicast",
			showInLegend: true,
			lineColor: "#4BDD33",
			markerColor: "#4BDD33",
			markerSize: 12,
			color:"#4BDD33",
			dataPoints: enp0s10
		}
		rxBytes_enp0s8.options.data.push(NokiaWifi);

		var BenchmarkZeroWifi = {	
			type: "line",
			name: "DSL/WiFi Multicast",
			showInLegend: true,
			lineColor: "#4BDD33",
			markerColor: "#4BDD33",
			//markerType: "triangle",
			markerSize: 12,
			color:"#4BDD33",
			dataPoints: zero_vec
    		};
    		rxBytes_ifb0.options.data.push(BenchmarkZeroWifi);

		rxBytes_enp0s8.render();
		rxBytes_ifb0.render();
	}
	else if(scenario=="cell_edge" && cell_edge_add){
		
		cell_edge_add = 0;

		var Unicast4G = {
			type: "line",
			name: "4G Unicast",
			showInLegend: true,
			lineColor: "#00D2FF",
			markerColor: "#00D2FF",
			markerSize: 12,
			color:"#00D2FF",
			dataPoints: enp0s8
		};
		rxBytes_enp0s8.options.data.push(Unicast4G);

		if (enp0s8.length > dataLength) {
			enp0s8.shift();
		}

		var Benchmark5GUnicast = {	
			type: "line",
			name: "5G Repair",
			showInLegend: true,
			lineColor: "#124191",
			markerColor: "#124191",
			markerType: "triangle",
			markerSize: 12,
			color:"#124191",
			dataPoints: ifb1
    		};
    		rxBytes_ifb0.options.data.push(Benchmark5GUnicast);

		if (ifb1.length > dataLength) {
			ifb1.shift();
		}		
		
		rxBytes_enp0s8.render();
		rxBytes_ifb0.render();
	}
    });


   var update_ifb0 = function (count) {

	if (ifb0.length > dataLength) {
		ifb0.shift();
	}
	if (ifb1.length > dataLength) {
		ifb1.shift();
	}
	if (zero_vec.length > dataLength) {
		zero_vec.shift();
	}

	rxBytes_ifb0.render();
   };

   var update_ifb1 = function (count) {

	if (ifb1.length > dataLength) {
		ifb1.shift();
	}

	rxBytes_ifb1.render();
   };

   var update_enp0s8 = function (count) {

	if (enp0s8.length > dataLength) {
		enp0s8.shift();
	}	

	if (enp0s9.length > dataLength) {
		enp0s9.shift();
	}

	if (enp0s10.length > dataLength) {
		enp0s10.shift();
	}

	rxBytes_enp0s8.render();
   };

   var update_enp0s9 = function (count) {

	if (enp0s9.length > dataLength) {
		enp0s9.shift();
	}

	rxBytes_enp0s9.render();
   };

   var update_enp0s10 = function (count) {	

	if (enp0s10.length > dataLength) {
		enp0s10.shift();
	}

	rxBytes_enp0s10.render();
   };

   setInterval(function(){update_ifb0()}, updateInterval);
   //setInterval(function(){update_ifb1()}, updateInterval);
   setInterval(function(){update_enp0s8()}, updateInterval);
   //setInterval(function(){update_enp0s9()}, updateInterval);
   //setInterval(function(){update_enp0s10()}, updateInterval);
}



