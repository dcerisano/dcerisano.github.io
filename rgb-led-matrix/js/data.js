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
var selected_server = 0;

//Editable grid cannot be obfuscated, so data.js is clear.
//Obfuscated files can call in, but data.js cannot call out.

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
	var gridConfig = {enableSort:false};

	layerGrid = new EditableGrid("layerGrid", gridConfig); 	
	layerGrid.modelChanged = set_data_req;
	layerGrid.tableLoaded = function() { 
		layerGrid.duplicate = duplicate;
		layerGrid.setCellRenderer("action", new CellRenderer({render: function(cell, value) {
			cell.innerHTML = createActions(layerGrid, cell.rowIndex);
		}})); 
		layerGrid.renderGrid("layer_grid", "grid"); 
	};

	shaderGrid = new EditableGrid("shaderGrid", gridConfig);
	shaderGrid.modelChanged = set_data_req;
	shaderGrid.tableLoaded = function() { 
		shaderGrid.renderGrid("shader_grid", "grid"); 
	};

	deviceGrid = new EditableGrid("deviceGrid", gridConfig);
	deviceGrid.modelChanged = set_data_req;
	deviceGrid.tableLoaded = function() { 
		deviceGrid.renderGrid("device_grid", "grid"); 
	};

	serverGrid = new EditableGrid("serverGrid", gridConfig);
	serverGrid.modelChanged = serverChanged;
	serverGrid.tableLoaded = function() { 
		serverGrid.reconnect = reconnect;
		serverGrid.setCellRenderer("action", new CellRenderer({render: function(cell, value) {
			cell.innerHTML = createServerActions(serverGrid, cell.rowIndex, cell);
			servers.data[cell.rowIndex].cell = cell;
			
		}})); 
		serverGrid.renderGrid("server_grid", "grid"); 
	};

	servers = {};
	servers.metadata = [];
	servers.metadata[0] = {};
	servers.metadata[0].name = "selected";
	servers.metadata[0].label= "Selected";
	servers.metadata[0].datatype = "boolean";
	servers.metadata[0].editable = true;
	servers.metadata[1] = {};
	servers.metadata[1].name = "hostname";
	servers.metadata[1].label= "Hostname";
	servers.metadata[1].datatype = "string";
	servers.metadata[1].editable = false;
	servers.metadata[2] = {};
	servers.metadata[2].name = "platform";
	servers.metadata[2].label= "Platform";
	servers.metadata[2].datatype = "string";
	servers.metadata[2].editable = false;
	servers.metadata[3] = {};
	servers.metadata[3].name = "address";
	servers.metadata[3].label= "Address";
	servers.metadata[3].datatype = "string";
	servers.metadata[3].editable = false;
	servers.metadata[4] = {};
	servers.metadata[4].name = "action";
	servers.metadata[4].label= "Status";
	servers.metadata[4].datatype = "html";
	servers.metadata[4].editable = false;
	servers.data = [];

	serverGrid.processJSON(servers); serverGrid.tableLoaded();
}

function reconnect(index)
{
	window.location.reload();
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

function createServerActions(grid, index)
{
	var inner;

	var connect = "closed";

	if (servers.data[index].values.status=="UP")
        connect = "open";
	
	inner= "&nbsp;<a onclick=\""+grid.name+".reconnect("+ index + ");\" style=\"cursor:pointer\">" +
	"<img src=\"img/"+connect+".png" + "\" border=\"0\" alt=\"connect\" title=\"Reconnect\"/></a>";

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


function serverChanged(rowIdx, colIdx, oldValue, newValue, row)
{

	//Cannot unselect - one server must always be selected
	if (newValue==false){
		servers.data[rowIdx].values.selected = true;
	}
	else if (servers.data[rowIdx].values.status == "DOWN"){
		servers.data[rowIdx].values.selected = false;
	}
	else
	{
		//clear all
		for (var i=0; i<servers.data.length; i++)
			servers.data[i].values.selected = false;
		//reselect
		servers.data[rowIdx].values.selected = true;
		selected_server = rowIdx;
		socket_send(selected_server, "get_data_req", null);
		server_name.innerHTML="Configuring: "+servers.data[selected_server].values.hostname;
	}

	serverGrid.processJSON(servers);   
	serverGrid.tableLoaded();

}

function socket_send(selected, method, p)
{
	DEBUG && console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+ json(method, p));

	if (servers.data[selected].socket.readyState === servers.data[selected].socket.OPEN)
		servers.data[selected].socket.send(json(method, p));	
}

function json(method, p) {
	var message = {"method": method, "params": p};
	return JSON.stringify(message);
}

function data_close(ip)
{
	for (var i=0; i<servers.data.length; i++){
		if (servers.data[i].values.address == ip){
			servers.data[i].values.status="DOWN";

			if (servers.data[i].values.selected){
				servers.data[i].values.selected=false;
				selected_server = findFirstUp();	
			}

			console.log(selected_server);

			if (selected_server>=0){	
				servers.data[selected_server].values.selected = true;
				socket_send(selected_server, "get_data_req", null);
				server_name.innerHTML="Configuring: "+servers.data[selected_server].values.hostname;
			}

			serverGrid.processJSON(servers);   
			serverGrid.tableLoaded();

			return selected_server;
		}
	}
}

function findFirstUp()
{
	for (var i=0; i<servers.data.length; i++)
		if (servers.data[i].values.status == "UP")
			return i;
	return -1;
}
