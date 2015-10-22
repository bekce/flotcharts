window.com_sebworks_flotcharts_Flot = function() {

	var thisFlot = this;
	var element = $(this.getElement());
	var plot;
	var options;
	var series;
	var currentRanges;

	function addSelectZoomReset(){
		$("<div class='button' style='position: absolute;cursor: pointer;font-size: medium; color: #999; background-color: #eee; padding: 2px;right:20px;top:20px'>reset</div>")
			.appendTo(element)
			.click(function (event) {
				event.preventDefault();
				plot = $.plot(element, series,
					$.extend(true, {}, options, {
						xaxis: { min: null, max: null },
						yaxis: { min: null, max: null }
					})
				);
				currentRanges = null;
				// addSelectZoomReset();
			});
	}

	var updateFlot = function() {

		// get state
		var state = thisFlot.getState();

		// construct options
		options = {};
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
		if(state.selectAndZoom){
			options.selection = { mode: state.selectAndZoomMode }
		}

		// construct series array
		series = [];
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
		if(currentRanges != null){
			var plot = $.plot(element, series, $.extend(true, {}, options, {
							xaxis: { min: currentRanges.xaxis.from, max: currentRanges.xaxis.to },
							yaxis: { min: currentRanges.yaxis.from, max: currentRanges.yaxis.to }
						})
					);
					addSelectZoomReset();
		} else {
			var plot = $.plot(element, series, options);
		}


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

		} else if(state.selectAndZoom){

			// now connect the two

			element.bind("plotselected", function (event, ranges) {

				// clamp the zooming to prevent eternal zoom

				if (ranges.xaxis.to - ranges.xaxis.from < 0.001) {
					ranges.xaxis.to = ranges.xaxis.from + 0.001;
				}

				if (ranges.yaxis.to - ranges.yaxis.from < 0.001) {
					ranges.yaxis.to = ranges.yaxis.from + 0.001;
				}

				currentRanges = ranges;

				// do the zooming

				plot = $.plot(element, series,
					$.extend(true, {}, options, {
						xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
						yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
					})
				);
				addSelectZoomReset();
			});

		}
	}

	this.onStateChange = updateFlot;
	window.addEventListener("resize", updateFlot);

};
console.log("[flotcharts] init");
