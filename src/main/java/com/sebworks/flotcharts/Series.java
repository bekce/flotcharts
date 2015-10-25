package com.sebworks.flotcharts;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author seb
 *
 */
public class Series implements Serializable {

	public enum SeriesType {
		LINE, COLUMN
	}
	/**
	 * Type of this Series.
	 */
	public SeriesType type = SeriesType.LINE;
	/**
	 * (Flot doc) If you don't specify color, the series will get a color from
	 * the auto-generated colors. The color is either a CSS color specification
	 * (like "rgb(255, 100, 123)") or an integer that specifies which of
	 * auto-generated colors to select, e.g. 0 will get color no. 0, etc.
	 */
	public String color = null;
	/**
	 * (Flot doc) The label is used for the legend, if you don't specify one,
	 * the series will not show up in the legend.
	 */
	public String label;
	/**
	 * Data of this series: [[x, y], [x, y], ...] <br>
	 * X series should usually be non-decreasing with index. Flot regards the
	 * data order and draws the chart from one point to the next in the given
	 * array.
	 */
	public List<double[]> data = new ArrayList<>();

//	public Integer xaxis = null;
//	public Integer yaxis = null;
//	/**
//	 * "clickable" and "hoverable" can be set to false to disable interactivity
//	 * for specific series if interactivity is turned on in the plot, see below.
//	 */
//	public boolean clickable = true;
//	/**
//	 * "clickable" and "hoverable" can be set to false to disable interactivity
//	 * for specific series if interactivity is turned on in the plot, see below.
//	 */
//	public boolean hoverable = true;
//	public Integer shadowSize = null;
//	public String highlightColor = null;

	public boolean showPoints = true;

	public Series setColor(String color){
		this.color = color;
		return this;
	}

	public Series setLabel(String label) {
		this.label = label;
		return this;
	}

	public Series setType(SeriesType type){
		this.type = type;
		return this;
	}

	public Series setShowPoints(boolean showPoints){
		this.showPoints = showPoints;
		return this;
	}

	public Series addData(double x, double y) {
		data.add(new double[] { x, y });
		return this;
	}

	public Series clearData(){
		data.clear();
		return this;
	}
	
}
