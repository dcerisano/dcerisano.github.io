var DEBUG        = false;
var serverGrid   = {};
var layerGrid    = {};
var shaderGrid   = {};
var deviceGrid   = {};
var serv_grid    = document.getElementById('server_grid');
var layer_grid   = document.getElementById('layer_grid');
var shader_grid  = document.getElementById('shader_grid');
var device_grid  = document.getElementById('device_grid');
var parameters   = {};
var servers      = {};



function duplicate(rowIndex) 
{
	// copy values from given row
	var values = this.getRowValues(rowIndex);
	values['name'] = values['name'];

	// get id for new row (max id + 1)
	var newRowId = 0;
	for (var r = 0; r < this.getRowCount(); r++) newRowId = Math.max(newRowId, parseInt(this.getRowId(r)) + 1);

	// add new row
	this.insertAfter(rowIndex, newRowId, values); 

	set_data_req();
};

function init_grids()
{
	console.log("init grids");
	layerGrid = new EditableGrid("layerGrid"); 	
	layerGrid.modelChanged = set_data_req;
	layerGrid.tableLoaded = function() { 
		layerGrid.duplicate = duplicate;
		layerGrid.setCellRenderer("action", new CellRenderer({render: function(cell, value) {
			cell.innerHTML = createActions(layerGrid, cell.rowIndex);
		}})); 
		layerGrid.renderGrid("layer_grid", "grid"); 
	};

	shaderGrid = new EditableGrid("shaderGrid");
	shaderGrid.modelChanged = set_data_req;
	shaderGrid.tableLoaded = function() { 
		shaderGrid.renderGrid("shader_grid", "grid"); 
	};

	deviceGrid = new EditableGrid("deviceGrid");
	deviceGrid.modelChanged = set_data_req;
	deviceGrid.tableLoaded = function() { 
		deviceGrid.renderGrid("device_grid", "grid"); 
	};
	
	serverGrid = new EditableGrid("serverGrid");

	serverGrid.tableLoaded = function() { 
	serverGrid.renderGrid("server_grid", "grid"); 
	};
	
	servers = {};
	servers.metadata = [];
	servers.metadata[0] = {};
	servers.metadata[0].name = "hostname";
	servers.metadata[0].label= "Hostname";
	servers.metadata[0].datatype = "string";
	servers.metadata[0].editable = false;
	servers.metadata[1] = {};
	servers.metadata[1].name = "platform";
	servers.metadata[1].label= "Platform";
	servers.metadata[1].datatype = "string";
	servers.metadata[1].editable = false;
	servers.metadata[2] = {};
	servers.metadata[2].name = "address";
	servers.metadata[2].label= "Address";
	servers.metadata[2].datatype = "string";
	servers.metadata[2].editable = false;
	servers.metadata[3] = {};
	servers.metadata[3].name = "status";
	servers.metadata[3].label= "Status";
	servers.metadata[3].datatype = "string";
	servers.metadata[3].editable = false;
	
	servers.data = [];
	
	serverGrid.processJSON(servers); serverGrid.tableLoaded();
}


function createActions(grid, index)
{
	var inner;

	inner = "<a onclick=\"if ("+grid.name+".data.length>1) "+grid.name+".remove(" + index + "); set_data_req(); \" style=\"cursor:pointer\">" +
	"<img src=\"img/delete.png" + "\" border=\"0\" alt=\"delete\" title=\"Delete row\"/></a>";
	inner+= "&nbsp;<a onclick=\""+grid.name+".duplicate(" + index + ");\" style=\"cursor:pointer\">" +
	"<img src=\"img/duplicate.png" + "\" border=\"0\" alt=\"duplicate\" title=\"Duplicate row\"/></a>";	
	return inner;
}

function get_data_ack(p)
{
	layerGrid.processJSON(p.layers);   layerGrid.tableLoaded();
	shaderGrid.processJSON(p.shaders); shaderGrid.tableLoaded();
	deviceGrid.processJSON(p.devices); deviceGrid.tableLoaded();	
}

function set_data_req()
{
	parameters = {};
	parameters.layers = {};
	parameters.layers.data = [];
	for (var i=0; i<layerGrid.data.length; i++){
		parameters.layers.data[i]                 = {};
		parameters.layers.data[i].id              = layerGrid.data[i].id;
		parameters.layers.data[i].values          = {};
		parameters.layers.data[i].values.layer    = layerGrid.data[i].columns[0];
		parameters.layers.data[i].values.device   = layerGrid.data[i].columns[1];
		parameters.layers.data[i].values.geometry = layerGrid.data[i].columns[2];
		parameters.layers.data[i].values.shader   = layerGrid.data[i].columns[3];
		parameters.layers.data[i].values.options  = layerGrid.data[i].columns[4];
	}

	parameters.shaders = {};
	parameters.shaders.data = [];
	
	for (var i=0; i<shaderGrid.data.length; i++){
		parameters.shaders.data[i]={};
		parameters.shaders.data[i].id = shaderGrid.data[i].id;
		parameters.shaders.data[i].values={};
		parameters.shaders.data[i].values.options = shaderGrid.data[i].columns[0];
	}

	parameters.devices = {};
	parameters.devices.data = [];

	for (var i=0; i<deviceGrid.data.length; i++){
		parameters.devices.data[i]={};
		parameters.devices.data[i].id = deviceGrid.data[i].id;
		parameters.devices.data[i].values={};
		parameters.devices.data[i].values.options = deviceGrid.data[i].columns[0];
	}
	socket_send(selected_server, "set_data_req", parameters);

}

function get_info_ack(p){
	for (var i=0; i<num_servers; i++){
		if (p.ip === servers.data[i].values.address){
			servers.data[i].values.hostname  = p.hostname;
			servers.data[i].values.platform  = p.platform;
			servers.data[i].values.status    = p.status;
		}
	}
	serverGrid.processJSON(servers);   
	serverGrid.tableLoaded();
}