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
@JavaScript({ "jquery.min.js", "jquery.flot.js", "jquery.flot.pie.js", "jquery.flot.navigate.js", "jquery.flot.selection.js", "jquery.flot.time.js", "flot_connector.js" })
public class Flot extends AbstractJavaScriptComponent {

	public enum SelectAndZoomMode {
		NONE, X, Y, XY;
		@Override
		public String toString() {
			return this.name().toLowerCase();
		}
	}

	/**
	 * Create an empty flot with 100% width. Sets a temporary height value in case
	 * user forgets to set a value. Don't forget to set it.
	 */
	public Flot() {
		setWidth(100, Unit.PERCENTAGE);
		setHeight(200, Unit.PIXELS);
	}
	/**
	 * Show legend. Default is true.
	 */
	public Flot setDisplayLegend(boolean displayLegend) {
		getState().legend = displayLegend;
		return this;
	}
	/**
	 * Enables timeseries support for xAxis. x axis data needs to be UTC epoch
	 * milliseconds for this to work. Default is false.
	 */
	public Flot setXAxisTimeMode(boolean xAxisTimeMode) {
		getState().timeMode = xAxisTimeMode;
		return this;
	}
	/**
	 * Enables zoom and pan feature for both axises. Creates zoom out and navigation buttons.
	 * @param enableZoomAndPan
	 */
	public Flot setEnableZoomAndPan(boolean enableZoomAndPan){
		getState().zoomAndPan = enableZoomAndPan;
		return this;
	}

	/**
	 * Enables select and zoom functionality on given axises.
	 */
	public Flot setSelectAndZoomMode(SelectAndZoomMode mode){
		getState().selectAndZoomMode = mode.toString();
		getState().selectAndZoom = mode != SelectAndZoomMode.NONE;
		return this;
	}

	/**
	 * Selects custom style mode (only applicable for pie charts)
	 */
	public Flot setStyleMode(int styleMode){
		getState().styleMode = styleMode;
		return this;
	}

	/**
	 * Clears all series
	 */
	public Flot clearSeries() {
		getState().series.clear();
		return this;
	}

	/**
	 * @param series
	 *            Adds given series to the chart.
	 */
	public Flot addSeries(Series series) {
		getState().series.add(series);
		return this;
	}

	/**
	 * Remove given series from chart.
	 *
	 * @param series
	 */
	public Flot removeSeries(Series series) {
		getState().series.remove(series);
		return this;
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
