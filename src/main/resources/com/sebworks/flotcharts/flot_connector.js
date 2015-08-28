window.com_sebworks_flotcharts_Flot = function() {

	var thisFlot = this;
	var element = $(this.getElement());

	var updateFlot = function() {

		var options;
		if(thisFlot.getState().type == 1){
			options = {
				series: {
					lines: { show: true },
					points: { show: true }
				},
				grid : { hoverable : true }
			}
		}
		else if(thisFlot.getState().type == 2){
			options = {
				series: {
					bars: { show: true },
					points: { show: true }
				},
				grid : { hoverable : true }
			}
		}
		else {
			console.log("[flotcharts.flot] unhandled type");
		}
		$.plot(element, thisFlot.getState().series, options);
	}
	
	this.onStateChange = updateFlot;
	window.addEventListener("resize", updateFlot);

};
console.log("[flotcharts.flot] init");
