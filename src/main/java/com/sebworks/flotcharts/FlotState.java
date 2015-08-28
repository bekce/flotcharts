package com.sebworks.flotcharts;

import java.util.ArrayList;
import java.util.List;

import com.sebworks.flotcharts.Flot.Series;
import com.vaadin.shared.ui.JavaScriptComponentState;

/**
 * @author seb
 *
 */
public class FlotState extends JavaScriptComponentState {
	/**
	 * Array of series [[x, y], ...]
	 */
	public List<Series> series = new ArrayList<>();
	/**
	 * Display type of this chart
	 */
	public int type = Flot.LINE;
}