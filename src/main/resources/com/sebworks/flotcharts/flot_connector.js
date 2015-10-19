window.com_sebworks_flotcharts_Flot = function() {

	var thisFlot = this;
	var element = $(this.getElement());

	var updateFlot = function() {

		// get state
		var state = thisFlot.getState();
		
		// construct options
		var options = {};
		options.grid = { hoverable : true };
		if(state.legend){
			options.legend = { show : true, position : "nw" };
		}
		if(state.timeMode){
			options.xaxis = { mode : "time" };
		}
		if(state.zoomAndPan){
			options.zoom = { interactive : true };
			options.pan = { interactive : true };
		}
		
		// construct series array
		var series = [];
		for (var i = 0; i < state.series.length; i++) {
			var s1 = state.series[i];
			var s2 = {};
			s2.color = s1.color;
			s2.label = s1.label;
			s2.data = s1.data;
			if(s1.type == "LINE"){
				s2.lines = { show : true };
			}
			else if(s1.type == "COLUMN"){
				s2.bars = { show : true };
			}
			else {
				console.error("[flotcharts] non-recognized series type: "+s1.type);
			}
			if(s1.showPoints){
				s2.points = { show : true };
			}
			series.push(s2);
		}
		
		// flot it!
		var plot = $.plot(element, series, options);
		
		if(state.zoomAndPan){

			// add zoom out button 

			$("<div class='button' style='position: absolute;cursor: pointer;font-size: smaller; color: #999; background-color: #eee; padding: 2px;right:20px;top:20px'>zoom out</div>")
				.appendTo(element)
				.click(function (event) {
					event.preventDefault();
					plot.zoomOut();
				});

			// and add panning buttons

			// little helper for taking the repetitive work out of placing
			// panning arrows
			
			

			function addArrow(dir, right, top, offset) {
				$("<span class='v-icon' style='position: absolute;cursor: pointer;font-family: FontAwesome;right:" + right + "px;top:" + top + "px'>&#"+dir+";</span>")
					.appendTo(element)
					.click(function (e) {
						e.preventDefault();
						plot.pan(offset);
					});
			}

			addArrow("XF060", 55, 60, { left: -50 });
			addArrow("XF061", 25, 60, { left: 50 });
			addArrow("XF062", 40, 45, { top: -50 });
			addArrow("XF063", 40, 75, { top: 50 });

		}
	}
	
	this.onStateChange = updateFlot;
	window.addEventListener("resize", updateFlot);

};
console.log("[flotcharts] init");
