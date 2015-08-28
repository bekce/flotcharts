package com.sebworks.flotcharts;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.vaadin.annotations.JavaScript;
import com.vaadin.ui.AbstractJavaScriptComponent;

/**
 * @author seb
 *
 */
@JavaScript({"jquery.min.js", "jquery.flot.js", "flot_connector.js"})
public class Flot extends AbstractJavaScriptComponent{
	
	public static class Series implements Serializable {
		public String label;
		public List<double[]> data = new ArrayList<>();
		public Series setLabel(String label){
			this.label = label;
			return this;
		}
		public Series addData(double x, double y){
			data.add(new double[]{x,y});
			return this;
		}
	}
	
	public static final int LINE = 1;
	public static final int COLUMN = 2;
	
	public void clearSeries(){
		getState().series.clear();
	}

	public void addSeries(Series series){
		getState().series.add(series);
	}
	
	public void setType(int type){
		getState().type = type;
	}
	
	@Override
	public FlotState getState() {
		return (FlotState) super.getState();
	}
}