package com.sebworks.flotcharts;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.shared.ui.JavaScriptComponentState;

/**
 * @author seb
 *
 */
public class FlotState extends JavaScriptComponentState {
	public List<Series> series = new ArrayList<>();
	public boolean legend = true;
	public boolean timeMode = false;
	public boolean tooltips = false;
	public boolean points = true;
	public boolean zoomAndPan = false;
	public boolean selectAndZoom = false;
	public String selectAndZoomMode = "";
	public int styleMode = 0;

}
