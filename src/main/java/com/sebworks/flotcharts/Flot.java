package com.sebworks.flotcharts;

import java.util.Collections;
import java.util.List;

import com.vaadin.annotations.JavaScript;
import com.vaadin.ui.AbstractJavaScriptComponent;

/**
 * <p>
 * This component uses Flot library (http://www.flotcharts.org/) to display data
 * for basic needs. It's not as advanced as Vaadin Charts, but lightweight and
 * faster. Flot charts has great features with community supported plugins and
 * it is possible to port some of them to Vaadin with little effort.
 * </p>
 * <p>
 * It is VERY important for this component to have a defined width AND height
 * (percentage or fixed).<br>
 * If you're using percentage values, make sure ALL parent components has
 * defined sizes (percentage or fixed).
 * </p>
 * 
 * 
 * @author seb
 *
 */
@JavaScript({ "jquery.min.js", "jquery.flot.js", "flot_connector.js" })
public class Flot extends AbstractJavaScriptComponent {

	/**
	 * Create an empty flot with 100% width. Don't forget to set a height value.
	 */
	public Flot() {
		setWidth(100, Unit.PERCENTAGE);
	}

	/**
	 * Show legend. Default is true.
	 */
	public void setDisplayLegend(boolean displayLegend) {
		getState().legend = displayLegend;
	}
	
	/**
	 * Show tooltips on each point. Default is false.
	 */
	public void setDisplayTooltips(boolean displayTooltips){
		getState().tooltips = displayTooltips;
	}
	
	/**
	 * Show points. Default is true.
	 */
	public void setDisplayPoints(boolean displayPoints){
		getState().points = displayPoints;
	}

	/**
	 * Enables timeseries support for xAxis. x axis data needs to be UTC epoch
	 * milliseconds for this to work. Default is false.
	 */
	public void setXAxisTimeMode(boolean xAxisTimeMode) {
		getState().timeMode = xAxisTimeMode;
	}

	/**
	 * Clears all series
	 */
	public void clearSeries() {
		getState().series.clear();
	}

	/**
	 * @param series
	 *            Adds given series to the chart.
	 */
	public void addSeries(Series series) {
		getState().series.add(series);
	}

	/**
	 * Remove given series from chart.
	 * 
	 * @param series
	 */
	public void removeSeries(Series series) {
		getState().series.remove(series);
	}

	/**
	 * @return charts' added series
	 */
	public List<Series> getSeries() {
		return Collections.unmodifiableList(getState().series);
	}

	/**
	 * Call after mutating already added series objects. You don't need to call
	 * it after after using Flot's methods.
	 */
	public void refresh() {
		markAsDirty();
	}

	@Override
	public FlotState getState() {
		return (FlotState) super.getState();
	}
}