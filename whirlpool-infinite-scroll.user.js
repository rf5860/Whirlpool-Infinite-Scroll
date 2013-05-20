// ==UserScript==
// @name          Whirlpool Infinite Scroll
// @description	  Add infinite scroll to all Whirlpool threads.
// @include       http://forums.whirlpool.net.au/forum-replies*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==
// Users
var lastPage;
var paging;
$(document).ready(function() {
		      lastPage = null;
		      var paging = false;;
		  });

$(window).scroll(function() {
		     if (!paging) {
			 if($(window).scrollTop() + $(window).height() > $(document).height() - 500) {
			     paging = true;
			     var loc = window.location.href;
			     var idx = loc.lastIndexOf("&p=");
			     if (lastPage == null) {
				 var page = idx == -1 ? 1 : loc.substring(loc.lastIndexOf("&p=") + 3);
				 lastPage = parseInt(page, 10) + 1;
			     }
			     var next = (idx == -1) ? loc : loc.substring(0, idx);
			     next += "&p=" + lastPage++;
			     $.get(next, 
				   function(data) { 
				       $('#replylist').append($('#replylist', data));
				       paging = false;
				   }
				  );     
			 }			 
		     }
		 });