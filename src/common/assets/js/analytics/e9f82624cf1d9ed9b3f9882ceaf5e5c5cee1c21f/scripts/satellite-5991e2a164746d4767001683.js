_satellite.pushAsyncScript(function(event, target, $variables){
  //INPUT TRACKER
var inputInfo = "";
var formParent = this.form || "";
var pageName = s.pageName || 'not found';

inputInfo = this.getAttribute('data-ana') || this.getAttribute('data-meta') || this.id || this.name  || this.className || this.placeholder;
  if (this.type=="checkbox" || this.type=="radio"){
    inputInfo = inputInfo+":"+this.value;
  }
  
  formParent = (formParent.length == 0) ? "not found" : (formParent.getAttribute('data-ana') || formParent.getAttribute('data-meta') || formParent.name || formParent.id || formParent.className || "not found");

  var prop41 = inputInfo || "";
  var prop42 = formParent || "";
  var prop43 = pageName || "";

DTM.setFormTracking(prop41,prop42,prop43);
});
