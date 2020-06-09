_satellite.pushAsyncScript(function(event, target, $variables){
  

var inputInfo = "";
var formParent = "";
var pageName = DTM.pageName || 'not found';
var prop41 = "";
var prop42 = "";
var prop43 = "";
var form = $(this).parents('form');
var formmeta = $(this).closest("form");
	
	inputInfo = this.getAttribute('data-ana') || this.getAttribute('data-meta') || this.name || this.id || this.className || this.placeholder;
	inputInfo = inputInfo+":"+this.options[this.selectedIndex].text;
	formParent = (form.length == 0) ? 'not found' : (formmeta.attr('data-ana') || formmeta.attr('data-meta') || form[0].name || form[0].id || form[0].className || 'not found');
	prop41 = inputInfo;
	prop42 = formParent;
	prop43 = pageName;
	DTM.setFormTracking(prop41,prop42,prop43);

  //console.log(" SELECT prop26="+prop26);



});
