window.com_sebworks_flotcharts_Flot = function() {

	var thisFlot = this;
	var element = $(this.getElement());

	var updateFlot = function() {

		// get state
		var state = thisFlot.getState();
		
		// construct options
		var options = {}
		options.grid = { hoverable : true }
		if(state.legend){
			options.legend = { show : true }
		}
		if(state.timeMode){
			options.xaxis = { mode = "time" }
		}
		
		// construct series array
		var series = []
		for (var i = 0; i < state.series.length; i++) {
			var s1 = state.series[i]
			var s2 = {}
			s2.color = s1.color
			s2.label = s1.label
			s2.data = s1.data
			if(s1.type == "LINE"){
				s2.lines = { show : true }
			}
			else if(s1.type == "COLUMN"){
				s2.bars = { show : true }
			}
			else {
				console.error("[flotcharts] non-recognized series type: "+s1.type);
			}
			if(s1.showPoints){
				s2.points = { show : true }
			}
			series.push(s2);
		}
		
		// flot it!
		$.plot(element, series, options);
	}
	
	this.onStateChange = updateFlot;
	window.addEventListener("resize", updateFlot);

};
console.log("[flotcharts] init");
