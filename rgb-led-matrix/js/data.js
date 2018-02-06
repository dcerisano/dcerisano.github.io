var layerGrid    = {};
var shaderGrid   = {};
var deviceGrid   = {};
var layer_grid   = document.getElementById('layer_grid');
var shader_grid  = document.getElementById('shader_grid');
var device_grid  = document.getElementById('device_grid');



layerGrid = new EditableGrid("layerGrid"); 	
console.log(layerGrid.name);
layerGrid.modelChanged = set_data_req;
layerGrid.tableLoaded = function() { 
	layerGrid.duplicate = duplicate;
	this.setCellRenderer("action", new CellRenderer({render: function(cell, value) {
		cell.innerHTML = createActions(layerGrid, cell.rowIndex);
	}})); 
	this.renderGrid("layer_grid", "grid"); 
};


shaderGrid = new EditableGrid("shaderGrid");
shaderGrid.modelChanged = set_data_req;
shaderGrid.tableLoaded = function() { 
	shaderGrid.duplicate = duplicate;
	this.setCellRenderer("action", new CellRenderer({render: function(cell, value) {
		cell.innerHTML = createActions(shaderGrid, cell.rowIndex);
	}})); 
	this.renderGrid("shader_grid", "grid"); 
};


deviceGrid = new EditableGrid("deviceGrid");
deviceGrid.modelChanged = set_data_req;
deviceGrid.tableLoaded = function() { 
	deviceGrid.duplicate = duplicate;
	this.setCellRenderer("action", new CellRenderer({render: function(cell, value) {
		cell.innerHTML = createActions(deviceGrid, cell.rowIndex);
	}})); 
	this.renderGrid("device_grid", "grid"); 
};


function createActions(grid, index)
{
	var inner;

	inner = "<a onclick=\"if ("+grid.name+".data.length>1) "+grid.name+".remove(" + index + "); "+set_data_req.name+"(); \" style=\"cursor:pointer\">" +
	"<img src=\"img/delete.png" + "\" border=\"0\" alt=\"delete\" title=\"Delete row\"/></a>";
	inner+= "&nbsp;<a onclick=\""+grid.name+".duplicate(" + index + ");\" style=\"cursor:pointer\">" +
	"<img src=\"img/duplicate.png" + "\" border=\"0\" alt=\"duplicate\" title=\"Duplicate row\"/></a>";	
	return inner;
}

function get_data_ack(p)
{
	console.log("GET DATA ACK");
	layerGrid.processJSON(p.layers);   layerGrid.tableLoaded();
	shaderGrid.processJSON(p.shaders); shaderGrid.tableLoaded();
	deviceGrid.processJSON(p.devices); deviceGrid.tableLoaded();	
}

function set_data_req()
{
	params = {};
	params.layers = {};
	params.layers.data = [];
	for (var i=0; i<layerGrid.data.length; i++){
		params.layers.data[i]={};
		params.layers.data[i].id = layerGrid.data[i].id;
		params.layers.data[i].values={};
		params.layers.data[i].values.zone   = layerGrid.data[i].columns[0];
		params.layers.data[i].values.device = layerGrid.data[i].columns[1];
		params.layers.data[i].values.shader = layerGrid.data[i].columns[2];
	}
	console.log("SET DATA REQ");
	socket_send("set_data_req", params);

}