(function(){var SHARE=function(){var makeParamStr=function(obj){var paramStr="";for(var property in obj){if(obj.hasOwnProperty(property)){paramStr+=property.toString()+"="+obj[property]+"&"}}return paramStr};var openInNewWindow=function(url,title,w,h){var dualSreenLeft,dualScreenTop,width,height,left,top,newWindow;dualScreenLeft=window.screenLeft!==undefined?window.screenLeft:screen.left;dualScreenTop=window.screenTop!==undefined?window.screenTop:screen.top;width=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width;height=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height;left=width/2-w/2+dualScreenLeft;top=height/3-h/3+dualScreenTop;newWindow=window.open(url,title,"scrollbars=yes, width="+w+", height="+h+", top="+top+", left="+left);if(window.focus){newWindow.focus()}};return{twitter:function(options){var url="https://twitter.com/share?"+makeParamStr(options);openInNewWindow(url,"twitter",580,250)},facebook:function(href){var url="https://facebook.com/sharer/sharer.php?u="+href;openInNewWindow(url,"facebook",580,368)},pinterest:function(options){var url="https://www.pinterest.com/pin/create/button/?"+makeParamStr(options);openInNewWindow(url,"pinterest",750,320)},linkedin:function(options){options.mini=true;var url="http://www.linkedin.com/shareArticle?"+makeParamStr(options);openInNewWindow(url,"linkedin",520,570)}}}();$(".social li.whatsapp a").click(function(event){event.defaultPrevented;var anchor=$(this);var baseUrl="https://api.whatsapp.com/send?text=";var theText,theVia,theHashtags;theText=anchor.attr("data-text");function openInNewTab(url){var win=window.open(url,"_blank");win.focus()}openInNewTab(baseUrl+encodeURI(theText))});$(".social li.twitter a").click(function(event){event.defaultPrevented;var anchor=$(this);var theText,theVia,theHashtags;theVia=anchor.attr("data-via");theText=anchor.attr("data-text");theHashtags=anchor.attr("data-hashtags");var url=window.location;SHARE.twitter({url:url,via:theVia,text:theText,hashtags:theHashtags})});$(".social li.facebook a").click(function(event){event.defaultPrevented;var anchor=$(this);var theUrl;theURL=window.location;SHARE.facebook(theURL)});$(".social-special li.twitter a").click(function(event){event.preventDefault();var anchor=$(this);var theText,theVia,theHashtags;theVia=anchor.attr("data-via");theText=anchor.attr("data-text");theHashtags=anchor.attr("data-hashtags");SHARE.twitter({via:theVia,text:theText,hashtags:theHashtags})});$(".social-special li.facebook a").click(function(event){event.defaultPrevented;var anchor=$(this);var theUrl;theURL=window.location;SHARE.facebook(theURL)})}).call(this);