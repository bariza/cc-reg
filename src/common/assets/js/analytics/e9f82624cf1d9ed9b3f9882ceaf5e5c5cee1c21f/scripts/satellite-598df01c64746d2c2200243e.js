var DTM = (function(){
    
  /* Avoid "console" errors in browsers that lack a console. */
  (function() {
    var method;
    var noop = function () {};
    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
  })();
  
  /* fix indexOf issue with internet explorer */
  (function() {
    if (!window.dojo) {
      if (!Array.indexOf) {
        Array.prototype.indexOf = function (obj) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
              return i;
            }
          }
          return -1;
        }
      }
    }
  })();

  
 
  
  // Linktracking Functions
  function _linkTracking(link41, pos42, name43, linkType){
    linkType = linkType || "Linktracking solution";
    s.linkTrackVars = "prop41,prop42,prop43";
    s.prop41 = link41;
    s.prop42 = pos42;
    s.prop43 = name43;
    s.tl(this,'o',linkType,null,'navigate');
  }
  
  //Form tracking
  function _setFormTracking(link41, pos42, name43, linkType){
    linkType = linkType || "FormTracking solution";
    s.linkTrackVars = "prop41,prop42,prop43";
    s.prop41 = link41;
    s.prop42 = pos42;
    s.prop43 = name43;
    s.tl(this,'o',linkType,null,'formTracker');
    //console.log(formData);
  }


  return{
    linkTraking: _linkTracking,
    setFormTracking: _setFormTracking,

  }
  
})();
