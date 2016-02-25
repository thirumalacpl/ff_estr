/*
jQWidgets v3.1.0 (2013-Dec-22)
Copyright (c) 2011-2013 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){a.jqx.dataview.sort=function(){this.sortby=function(d,f,p){var m=Object.prototype.toString;if(f==null){this.sortdata=null;this.refresh();return}if(f==undefined){f=true}if(f=="a"||f=="asc"||f=="ascending"||f==true){f=true}else{f=false}var g=d;this.sortfield=d;this.sortfielddirection=f?"asc":"desc";if(this.sortcache==undefined){this.sortcache={}}this.sortdata=[];var b=[];var c=false;if(g=="constructor"){g=""}if(!this.virtualmode&&this.sortcache[g]!=null){var o=this.sortcache[g];b=o._sortdata;if(o.direction==f){b.reverse()}else{if(!o.direction&&f){b.reverse()}c=true}if(b.length<this.totalrecords){this.sortcache={};c=false;b=[]}}Object.prototype.toString=(typeof d=="function")?d:function(){return this[d]};var r=this.records;var t=this.that;var n="";if(this.source.datafields){a.each(this.source.datafields,function(){if(this.name==d){if(this.type){n=this.type}return false}})}if(b.length==0){if(r.length){var h=r.length;for(var q=0;q<h;q++){var e=r[q];if(e!=null){var j=e;var s=j.toString();b.push({sortkey:s,value:j,index:q})}}}else{var l=false;for(obj in r){var e=r[obj];if(e==undefined){l=true;break}var j=e;b.push({sortkey:j.toString(),value:j,index:obj})}if(l){a.each(r,function(u,v){b.push({sortkey:v.toString(),value:v,index:u})})}}}if(!c){if(p==null){this._sortcolumntype=n;var k=this;b.sort(function(u,i){return k._compare(u,i,n)})}else{b.sort(p)}}if(!f){b.reverse()}Object.prototype.toString=m;this.sortdata=b;this.sortcache[g]={_sortdata:b,direction:f};this.reload(this.records,this.rows,this.filters,this.updated,true)},this.clearsortdata=function(){this.sortcache={};this.sortdata=null};this._compare=function(c,b,e){var c=c.sortkey;var b=b.sortkey;if(c===undefined){c=null}if(b===undefined){b=null}if(c===null&&b===null){return 0}if(c===null&&b!==null){return 1}if(c!==null&&b===null){return 1}if(a.jqx.dataFormat){if(e&&e!=""){switch(e){case"number":case"int":case"float":if(c<b){return -1}if(c>b){return 1}return 0;case"date":case"time":if(c<b){return -1}if(c>b){return 1}return 0;case"string":case"text":c=String(c).toLowerCase();b=String(b).toLowerCase();break}}else{if(a.jqx.dataFormat.isNumber(c)&&a.jqx.dataFormat.isNumber(b)){if(c<b){return -1}if(c>b){return 1}return 0}else{if(a.jqx.dataFormat.isDate(c)&&a.jqx.dataFormat.isDate(b)){if(c<b){return -1}if(c>b){return 1}return 0}else{if(!a.jqx.dataFormat.isNumber(c)&&!a.jqx.dataFormat.isNumber(b)){c=String(c).toLowerCase();b=String(b).toLowerCase()}}}}}try{if(c<b){return -1}if(c>b){return 1}}catch(d){var f=d}return 0};this._equals=function(c,b){return(this._compare(c,b)===0)}};a.extend(a.jqx._jqxGrid.prototype,{_rendersortcolumn:function(){var b=this.that;var d=this.getsortcolumn();if(this.sortdirection){var c=function(f,g){var e=b.getcolumn(f);if(e){if(g.ascending){a.jqx.aria(e.element,"aria-sort","ascending")}else{if(g.descending){a.jqx.aria(e.element,"aria-sort","descending")}else{a.jqx.aria(e.element,"aria-sort","none")}}}};if(this._oldsortinfo){if(this._oldsortinfo.column){c(this._oldsortinfo.column,{ascending:false,descending:false})}}c(d,this.sortdirection)}this._oldsortinfo={column:d,direction:this.sortdirection};if(this.sortdirection){a.each(this.columns.records,function(f,g){var e=a.data(document.body,"groupsortelements"+this.displayfield);if(d==null||this.displayfield!=d){a(this.sortasc).hide();a(this.sortdesc).hide();if(e!=null){e.sortasc.hide();e.sortdesc.hide()}}else{if(b.sortdirection.ascending){a(this.sortasc).show();a(this.sortdesc).hide();if(e!=null){e.sortasc.show();e.sortdesc.hide()}}else{a(this.sortasc).hide();a(this.sortdesc).show();if(e!=null){e.sortasc.hide();e.sortdesc.show()}}}})}},getsortcolumn:function(){if(this.sortcolumn!=undefined){return this.sortcolumn}return null},removesort:function(){this.sortby(null)},sortby:function(d,g,f,e,b){if(this._loading&&b!==false){throw new Error("jqxGrid: "+this.loadingerrormessage);return false}if(d==null){g=null;d=this.sortcolumn}if(d!=undefined){var c=this.that;if(f==undefined&&c.source.sortcomparer!=null){f=c.source.sortcomparer}if(g=="a"||g=="asc"||g=="ascending"||g==true){ascending=true}else{ascending=false}if(g!=null){c.sortdirection={ascending:ascending,descending:!ascending}}else{c.sortdirection={ascending:false,descending:false}}if(g!=null){c.sortcolumn=d}else{c.sortcolumn=null}if(c.source.sort||c.virtualmode){c.dataview.sortfield=d;if(g==null){c.dataview.sortfielddirection=""}else{c.dataview.sortfielddirection=ascending?"asc":"desc"}if(c.source.sort&&!this._loading){c.source.sort(d,g);c._raiseEvent(6,{sortinformation:c.getsortinformation()});return}}else{c.dataview.sortby(d,g,f)}if(e===false){return}if(c.groupable&&c.groups.length>0){c._render(true,false,false);if(c._updategroupheadersbounds&&c.showgroupsheader){c._updategroupheadersbounds()}}else{if(c.pageable){c.dataview.updateview()}c._updaterowsproperties();c.rendergridcontent(true)}c._raiseEvent(6,{sortinformation:c.getsortinformation()})}},_togglesort:function(d){var b=this.that;if(this.disabled){return}if(d.sortable&&b.sortable){var c=b.getsortinformation();var e=null;if(c.sortcolumn!=null&&c.sortcolumn==d.displayfield){e=c.sortdirection.ascending;if(b.sorttogglestates>1){if(e==true){e=false}else{e=null}}else{e=!e}}else{e=true}b.sortby(d.displayfield,e,null)}}})})(jQuery);