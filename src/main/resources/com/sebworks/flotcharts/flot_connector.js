window.com_sebworks_flotcharts_Flot = function() {

	var thisFlot = this;
	var element = $(this.getElement());
	var plot;
	var options;
	var series;
	var currentRanges;
	
	function nFormatter(num) {
		if (num >= 1000000000) {
			return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'G';
		}
		if (num >= 1000000) {
			return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M';
		}
		if (num >= 1000) {
			return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K';
		}
		return num;
	}

	function labelFormatter(label, series) {
		var mode = thisFlot.getState().pieValueMode;
		var inside = '';
		if(mode=='percent'){
			inside=Math.round(series.percent) + "%";
		} else if (mode=='value-full') {
			inside=Math.round(Number(series.data[0][1])).toLocaleString()
		} else if (mode=='value-short') {
			inside=nFormatter(series.data[0][1])
		} else if (mode=='percent-value-full') {
			inside=Math.round(Number(series.data[0][1])).toLocaleString()+' ('+Math.round(series.percent)+"%)";
		} else if (mode=='percent-value-short') {
			inside=nFormatter(series.data[0][1])+' ('+Math.round(series.percent)+"%)";
		}
		return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + inside + "</div>";
	}

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
		} else {
			options.legend = { show: false };
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
		var isPie = false;
		var isCategorical = false;
		for (var i = 0; i < state.series.length; i++) {
			var s1 = state.series[i];
			var s2 = {};
			s2.color = s1.color;
			s2.label = s1.label;
			s2.data = s1.data;
			if(s1.showPoints){
				s2.points = { show : true };
			}
			if(s1.type == "LINE"){
				s2.lines = { show : true };
			}
			else if(s1.type == "COLUMN"){
				s2.bars = {
					show : true,
					barWidth: s1.barWidth,
					align: s1.align
				};
			}
			else if(s1.type == "PIE"){
				isPie = true;
				s2.data = s1.data[0][0];
			}
			else if (s1.type == "CATEGORICAL") {
				s2.bars = {
					show : true,
					barWidth: s1.barWidth,
					align: s1.align
				};
				isCategorical = true;
			}
			else {
				console.error("[flotcharts] non-recognized series type: "+s1.type);
			}
			series.push(s2);
		}
		if(isPie){
			
			if(state.styleMode == 0){
				options.series = {
					pie: {
						show: true
					}
				};
			} else if (state.styleMode == 1) {
				options.series = {
					pie: {
						show: true,
						radius: 1,
						label: {
							show: true,
							radius: 3/4,
							formatter: labelFormatter,
							threshold: state.pieValueThreshold,
							background: {
								opacity: 0.5
							}
						}
					}
				};
				// options.legend = { show: false };
			} else if (state.styleMode == 2) {
				options.series = {
					pie: {
						show: true,
						radius: 1,
						label: {
							show: true,
							radius: 3/4,
							formatter: labelFormatter,
							threshold: state.pieValueThreshold,
							background: {
								opacity: 0.5,
								color: '#000'
							}
						}
					}
				};
				// options.legend = { show: false };
			} else if (state.styleMode == 3) {
				options.series = {
					pie: {
						show: true,
						radius: 1,
						label: {
							show: true,
							radius: 2/3,
							formatter: labelFormatter,
							threshold: state.pieValueThreshold
						}
					}
				};
				// options.legend = { show: false };
			}
		}
		if(isCategorical){
			options.xaxis = {
				mode: "categories", 
				tickLength: 0
			};
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
		
		var tooltip_id = 'flot_tooltip_'+Math.random().toString(36).substr(2, 10);
		$("<div id='"+tooltip_id+"'></div>").css({
			position: isPie ? "absolute" : "fixed",
			display: "none",
			border: "1px solid #fdd",
			padding: "2px",
			"background-color": "#fee",
			opacity: 0.80
		}).appendTo(element);
		if(isPie){
			element.bind("plothover", function (event, pos, item) {
				if (item) {
					var value = Math.round(Number(item.series.data[0][1])).toLocaleString()+' ('+Math.round(item.series.percent)+"%)";
					$("#"+tooltip_id).html(item.series.label + " " + value)
						.css({top: item.pageY+5, left: item.pageX+5})
						.fadeIn(200);
				} else {
					$("#"+tooltip_id).hide();
				}
			});
		} else {
			element.bind("plothover", function (event, pos, item) {
				if (item) {
					var value = Math.round(item.datapoint[1]).toLocaleString();
					$("#"+tooltip_id).html(item.series.label + " " + value)
						.css({top: item.pageY-50, left: item.pageX+5})
						.fadeIn(200);
				} else {
					$("#"+tooltip_id).hide();
				}
			});
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
