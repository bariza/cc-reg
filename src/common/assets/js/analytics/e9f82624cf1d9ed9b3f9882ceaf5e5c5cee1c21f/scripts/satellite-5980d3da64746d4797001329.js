_satellite.pushAsyncScript(function(event, target, $variables){
  //Link Tracking
console.log("link tracking in native javascript");

if (_satellite.isOutboundLink(this)) {
    /*  console.log('exit link');
    s.getPercentPageViewed();
    s.clearVars();
    console.log("this is clearing");*/


} else {

    var id = "not found";
    var pos = "no region";
    var urlBrowser = location.href;
    var urlhref = "";
    var href = this.getAttribute("href");
    var target = this.getAttribute("target");
    var isSameUrlNoHash = "";
    var classes = this.getAttribute("class") || "";
    var isTrack = (classes.indexOf('noTrack') > -1) ? false : true;
    var firstChild = this.firstChild || false;


    function getParentValue(node,attr){
      while(node = node.parentElement){
        if(node.getAttribute(attr)) 
          return node.getAttribute(attr) || false;
      }
    }

    //Data-region related information
    var parentRegion = getParentValue(this,"data-region");
    var parentID = getParentValue(this,"id");
    if (isTrack) {

        if (firstChild.tagName == "IMG") {
            id = firstChild.getAttribute('data-ana') || firstChild.getAttribute('data-meta') || firstChild.getAttribute('title') || firstChild.getAttribute('alt') || firstChild.getAttribute('src');
        } else {
            id = this.getAttribute('data-ana') || this.getAttribute('data-meta') || this.getAttribute('title') || this.getAttribute('id') || this.getAttribute('name') || this.outerText.trim() || href || "not found";
        }
            //pos = parentRegion || parentID || "not found";
            pos = parentRegion || "not found";
            
        if (href) {
            urlhref = href.split('#');
            urlBrowser = urlBrowser.split('#');
            isSameUrlNoHash = (urlhref[0] == urlBrowser[0]);

            if (target == '_blank' || href.indexOf('javascript') > -1 || href.indexOf('#') > -1 || isSameUrlNoHash) {
                DTM.linkTraking(id, pos, s.prop12);
            } 
        } else {
            DTM.linkTraking(id, pos, s.prop12);
        }
    } else {
        console.log('no tracking for this link');
    }
}
});
