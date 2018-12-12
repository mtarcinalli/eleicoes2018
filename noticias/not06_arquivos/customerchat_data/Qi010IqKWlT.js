if (self.CavalryLogger) { CavalryLogger.start_js(["kmvez"]); }

__d("DesktopHscrollUnitEventConstants",[],(function(a,b,c,d,e,f){e.exports={HSCROLL_ITEM_INSERTED_EVENT:"DesktopHScrollUnit/itemInserted",HSCROLL_ITEM_SHOWN_EVENT:"DesktopHScrollUnit/itemShown",HSCROLL_ITEM_HIDE_EVENT:"DesktopHScrollUnit/HideIndividualItem",HSCROLL_ITEM_SCROLL_BEFORE_XOUT_EVENT:"DesktopHScrollUnit/scrollItemBeforeXout",HSCROLL_ITEM_UNHIDE_EVENT:"DesktopHScrollUnit/unhideIndividualItem",HSCROLL_LAST_ITEM_NFX_ACTION_TAKEN:"logLastAdXout",HSCROLL_PAGER_ITEM_HIDE_EVENT:"onXoutIndividualItem"}}),null);
__d("EntstreamFeedObject",["csx","CSS","Parent"],(function(a,b,c,d,e,f,g){var h={getRoot:function(a){return b("Parent").bySelector(a,"._5jmm")},getHscrollOuterRootIfAvailable:function(a){a=a;b("CSS").matchesSelector(a,"._170y")&&(a=h.getRoot(a.parentNode));return a}};e.exports=h}),null);
__d("EntstreamFeedObjectTracking",["csx","CSS","DOM","EntstreamFeedObject","Focus","ge"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();var h=new Map();e.exports={register:function(a){var c=this.getRoot(a.nodeID);if(!c)return;var d=b("DOM").scry(c,"._5v9_"),e=d&&d.length?d:[c];a.actorIDs.forEach(function(a){var b=[].concat(h.get(a)||[]);b.push.apply(b,e);h.set(a,b)})},hideAllFromActor:function(a){var c=this.getRoot(a.nodeID);(h.get(a.actorID)||[]).forEach(function(a){if(a===c)return;b("CSS").hide(a)})},unhideAllFromActor:function(a){var c=this.getRoot(a.nodeID);(h.get(a.actorID)||[]).forEach(function(a){b("CSS").show(a)});c&&b("Focus").setWithoutOutline(c)},getRoot:function(a){a=b("ge")(a);return a?b("EntstreamFeedObject").getRoot(a):null}}}),null);
__d("collectDataAttributes",["DataAttributeUtils","getContextualParent"],(function(a,b,c,d,e,f){__p&&__p();var g="normal";function a(a,c,d){__p&&__p();var e={},f=[],h=c.length,i;for(i=0;i<h;++i)e[c[i]]={},f.push("data-"+c[i]);if(d){e[g]={};for(i=0;i<(d||[]).length;++i)f.push(d[i])}d={tn:"","tn-debug":","};a=a;while(a){if(a.getAttribute)for(i=0;i<f.length;++i){var j=f[i],k=b("DataAttributeUtils").getDataAttribute(a,j);if(k){if(i>=h){e[g][j]===void 0&&(e[g][j]=k);continue}j=JSON.parse(k);for(var l in j)d[l]!==void 0?(e[c[i]][l]===void 0&&(e[c[i]][l]=[]),e[c[i]][l].push(j[l])):e[c[i]][l]===void 0&&(e[c[i]][l]=j[l])}}a=b("getContextualParent")(a)}for(var m in e)for(var n in d)e[m][n]!==void 0&&(e[m][n]=e[m][n].join(d[n]));return e}e.exports=a}),null);
__d("FeedTrackingAsync",["Arbiter","Run","collectDataAttributes"],(function(a,b,c,d,e,f){__p&&__p();var g;e.exports.init=function(){__p&&__p();if(g)return;g=b("Arbiter").subscribe("AsyncRequest/send",function(a,c){a=c.request;c=a.getRelativeTo();if(c){a=a.getData();c=b("collectDataAttributes")(c,["ft"]);c.ft&&Object.keys(c.ft).length&&Object.assign(a,c)}});b("Run").onLeave(function(){g&&(g.unsubscribe(),g=null)})}}),null);
__d("PluginLoggedOutUserTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(){this.$1={}}a.prototype.log=function(){b("GeneratedLoggerUtils").log("logger:PluginLoggedOutUserLoggerConfig",this.$1,b("Banzai").BASIC)};a.prototype.logVital=function(){b("GeneratedLoggerUtils").log("logger:PluginLoggedOutUserLoggerConfig",this.$1,b("Banzai").VITAL)};a.prototype.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:PluginLoggedOutUserLoggerConfig",this.$1,{signal:!0})};a.prototype.clear=function(){this.$1={};return this};a.prototype.getData=function(){return babelHelpers["extends"]({},this.$1)};a.prototype.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.setHref=function(a){this.$1.href=a;return this};a.prototype.setIsSDK=function(a){this.$1.is_sdk=a;return this};a.prototype.setPluginAppID=function(a){this.$1.plugin_app_id=a;return this};a.prototype.setPluginName=function(a){this.$1.plugin_name=a;return this};a.prototype.setRefererURL=function(a){this.$1.referer_url=a;return this};a.prototype.setTime=function(a){this.$1.time=a;return this};a.prototype.setWeight=function(a){this.$1.weight=a;return this};a.prototype.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};var g={href:!0,is_sdk:!0,plugin_app_id:!0,plugin_name:!0,referer_url:!0,time:!0,weight:!0};e.exports=a}),null);
__d("FormSubmit",["AsyncRequest","AsyncResponse","CSS","DOMQuery","Event","Form","Parent","trackReferrer"],(function(a,b,c,d,e,f){__p&&__p();var g={buildRequest:function(a,c){__p&&__p();var d=(b("Form").getAttribute(a,"method")||"GET").toUpperCase();c=c&&b("Parent").byTag(c,"button")||c;var e=c&&b("Parent").byClass(c,"stat_elem")||a;if(b("CSS").hasClass(e,"async_saving"))return null;if(c&&(c.form!==a||c.nodeName!="INPUT"&&c.nodeName!="BUTTON"||c.type!="submit")){var f=b("DOMQuery").scry(a,".enter_submit_target")[0];f&&(c=f)}f=b("Form").serialize(a,c);b("Form").setDisabled(a,!0);c=b("Form").getAttribute(a,"ajaxify")||b("Form").getAttribute(a,"action");var g=!!b("Form").getAttribute(a,"data-cors");b("trackReferrer")(a,c);return new(b("AsyncRequest"))().setAllowCrossOrigin(g).setURI(c).setData(f).setNectarModuleDataSafe(a).setReadOnly(d=="GET").setMethod(d).setRelativeTo(a).setStatusElement(e).setInitialHandler(b("Form").setDisabled.bind(null,a,!1)).setHandler(function(c){b("Event").fire(a,"success",{response:c})}).setErrorHandler(function(c){b("Event").fire(a,"error",{response:c})!==!1&&b("AsyncResponse").defaultErrorHandler(c)}).setFinallyHandler(b("Form").setDisabled.bind(null,a,!1))},send:function(a,b){a=g.buildRequest(a,b);a&&a.send();return a}};e.exports=g}),null);
__d("AsyncFormRequestUtils",["Arbiter"],(function(a,b,c,d,e,f){a={subscribe:function(a,c,d){b("Arbiter").subscribe("AsyncRequest/"+c,function(b,c){b=c.request.relativeTo;b&&b===a&&d(c)})}};e.exports=a}),null);
__d("EmbeddedPostPluginActionTypes",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CLICK:"click"})}),null);
__d("EmbeddedPostPluginActions",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({EMBEDDED_POSTS_COMMENT:"embedded_post_comment",EMBEDDED_POSTS_LIKE:"embedded_post_like",EMBEDDED_POSTS_SHARE:"embedded_post_share",EMBEDDED_POSTS_UNLIKE:"embedded_post_unlike"})}),null);
__d("XPostPluginLoggingController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/platform/plugin/post/logging/",{})}),null);
__d("PluginFeedFooterActionLogger",["AsyncRequest","DOM","EmbeddedPostPluginActions","EmbeddedPostPluginActionTypes","Event","XPostPluginLoggingController"],(function(a,b,c,d,e,f){__p&&__p();a={initializeClickLoggers:function(a,c,d,e,f,g,h,i,j){var k=function(c,d){try{c=b("DOM").find(a,"."+c);b("Event").listen(c,"click",function(a){new(b("AsyncRequest"))().setURI(b("XPostPluginLoggingController").getURIBuilder().getURI()).setData({action:d,action_type:b("EmbeddedPostPluginActionTypes").CLICK,source:g,story_token:h,referer_url:i,is_sdk:j}).send()})}catch(a){}};k(c,b("EmbeddedPostPluginActions").EMBEDDED_POSTS_LIKE);k(d,b("EmbeddedPostPluginActions").EMBEDDED_POSTS_UNLIKE);k(e,b("EmbeddedPostPluginActions").EMBEDDED_POSTS_COMMENT);k(f,b("EmbeddedPostPluginActions").EMBEDDED_POSTS_SHARE)}};e.exports=a}),null);
__d("ClientIDs",["randomInt"],(function(a,b,c,d,e,f){var g={};a={getNewClientID:function(){var a=Date.now();a=a+":"+(b("randomInt")(0,4294967295)+1);g[a]=!0;return a},isExistingClientID:function(a){return!!g[a]}};e.exports=a}),null);
__d("FBFeedLocations",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({NEWSFEED:1,GROUP:2,GROUP_PERMALINK:3,COMMUNITY:4,PERMALINK:5,SHARE_OVERLAY:6,PERMALINK_STREAM:7,GROUP_PINNED:8,FRIEND_LIST:9,TIMELINE:10,HASHTAG_FEED:11,TOPIC_FEED:12,PAGE:13,NOTIFICATION_FEED:14,GROUP_REPORTED:15,GROUP_PENDING:16,PAGES_FEED_IN_PAGES_MANAGER:17,TICKER_CLASSIC:18,PAGES_SUGGESTED_FEED_IN_PAGES_MANAGER:19,SEARCH:20,GROUP_SEARCH:21,NO_ATTACHMENT:22,EMBED:23,EMBED_FEED:24,ATTACHMENT_PREVIEW:25,STORIES_TO_SHARE:26,PROMPT_PERMALINK:27,TREND_HOVERCARD:28,OPEN_GRAPH_PREVIEW:30,HOTPOST_IN_PAGES_FEED:31,SCHEDULED_POSTS:32,TIMELINE_NOTES:33,PAGE_INSIGHTS:34,COMMENT_ATTACHMENT:35,PAGE_TIMELINE:36,GOODWILL_THROWBACK_PERMALINK:37,LIKE_CONFIRM:39,GOODWILL_THROWBACK_PROMOTION:40,BROWSE_CONSOLE:42,GROUP_FOR_SALE_COMPACT:43,ENTITY_FEED:44,GROUP_FOR_SALE_DISCUSSION:45,PAGES_CONTENT_TAB_PREVIEW:46,GOODWILL_THROWBACK_SHARE:47,TIMELINE_VIDEO_SHARES:48,EVENT:49,PAGE_PLUGIN:50,SRT:51,PAGES_CONTENT_TAB_INSIGHTS:52,ADS_PE_CONTENT_TAB_INSIGHTS:53,PAGE_ACTIVITY_FEED:54,VIDEO_CHANNEL:55,POST_TO_PAGE:56,GROUPS_GSYM_HOVERCARD:57,GROUP_POST_TOPIC_FEED:58,FEED_SURVEY:59,PAGES_MODERATION:60,SAVED_DASHBOARD:61,PULSE_SEARCH:62,GROUP_NUX:63,GROUP_NUX_POST_VIEW:64,EVENT_PERMALINK:65,FUNDRAISER_PAGE:66,EXPLORE_FEED:67,CRT:68,REVIEWS_FEED:69,VIDEO_HOME_CHANNEL:70,NEWS:71,TIMELINE_FRIENDSHIP:72,SAVED_REMINDERS:73,PSYM:74,ADMIN_FEED:75,CAMPFIRE_NOTE:76,PAGES_CONTEXT_CARD:77,ACTIVITY_LOG:78,WALL_POST_REPORT:79,TIMELINE_BREAKUP:80,TOWN_HALL:81,PRODUCT_DETAILS:82,SPORTS_PLAY_FEED:83,GROUP_TOP_STORIES:84,PAGE_TIMELINE_PERMALINK:86,OFFERS_WALLET:87,INSTREAM_VIDEO_IN_LIVE:88,SPOTLIGHT:89,SEARCH_DERP:90,SOCIAL_BALLOT:91,GROUP_SUGGESTIONS_WITH_STORY:92,SOCIAL_BALLOT_PERMALINK:93,LOCAL_SERP:94,FUNDRAISER_SELF_DONATION_FEED:95,CONVERSATION_NUB:97,GROUP_TOP_SALE_STORIES:98,GROUP_LEARNING_COURSE_UNIT_FEED:99,SUPPORT_INBOX_READ_TIME_BLOCK:100,PAGE_POSTS_CARD:101,CRISIS_POST:102,SUPPORT_INBOX_GROUP_RESPONSIBLE:103,PAGE_POST_DIALOG:104,CRISIS_DIALOG_POST:105,PAGE_LIVE_VIDEOS_CARD:106,PAGE_POSTS_CARD_COMPACT:107,GROUP_MEMBER_BIO_FEED:108,LIVE_COMMENT_ATTACHMENT:109,GROUP_COMPOSER:110,GROUP_INBOX_GROUP:111,GROUP_INBOX_AGGREGATED:112,ENDORSEMENTS:113,EVENTS_DASHBOARD:114,CURATED_COLLECTIONS_PAGE:115,OYML:116,COLLEGE_HOMEPAGE:117,GROUP_LIVE_VIDEOS_CARD:118,COLLEGE_HIGHLIGHTS:119,VIDEO_PERMALINK:120,JOB_CAROUSEL_NETEGO:121,TOPIC_PAGE:122,USER_SCHEDULED_POSTS:123,GOODWILL_THROWBACK_ATTACHMENT_PREVIEW:124,INSTREAM_VIDEO_IN_WASLIVE:125,INSTREAM_VIDEO_IN_NONLIVE:126,SIGNAL_APP:127,ALBUM_FEED:128,TOP_MARKETPLACE_STORIES:129,CE_PII_STRIPPED_FEED:130,TAHOE:131,SAVE_COUNT_DIALOG:132,GROUP_POST_TAG_FEED:133,GOV_DIGEST:134,GROUP_SCHEDULED:135,GAMEROOM_FEED:136,WORKPLACE_HUB_PREVIEW:137,BRANDED_CONTENT_TRENDING_POSTS:138,GROUP_ANNOUNCEMENTS:139,GROUP_ANNOUNCEMENTS_FEED:140,EXTERN_CE_PII_STRIPPED_FEED:141,CRISIS_HUB_DESKTOP:142,GROUP_DRAFT_POSTS:143,TRENDING_ISSUES:144,GAME_HUB_FEED:145,LUMOS_POST_PREVIEW:146,BRANDED_CONTENT_PAGE_SETTINGS:147,BC_MULTI_POST_REVIEW:149,ADS_TRANSPARENCY_SHOW_ADS:150,POLITICAL_POST_FEED:151,RECOMMENDATIONS_DASHBOARD:152,SEEN_CONTENT:153,AGGREGATED_FEED:154,GROUP_HOISTED:155,GROUP_MENTORSHIP_OVERVIEW_FEED:156,GROUP_MENTORSHIP_CURRICULUM_FEED:157,PAGE_SURFACE_RECOMMENDATIONS:158,SURVEY_GALLERY:159,GAMING_VIDEO_STREAMER_HUB:160,GROUP_MEETUP_FEED:161,GROUP_FLAGGED_FEED:162,PAGE_RECOMMENDATIONS_TOOL:163,MEDIA_MANAGER_HOME:164,WOODHENGE_EXCLUSIVE_FEED:165,PAGE_RECOMMENDATIONS_TAB_FEED:166,GROUP_ANNOUNCEMENTS_WITH_UFI:167,GROUP_ADMIN_TO_MEMBER_FEEDBACK:168,MEDIA_MANAGER_POST_INSIGHTS:169,MISINFORMATION_FACT_CHECKER_APP:170,WORKPLACE_TEAM_FEED:171,NEWS_STORYLINE_FEED:172,PAGE_RECOMMENDATIONS_VERTEX_TAB_FEED:173,MONTHLY_ACTIVITY_DIGEST:174,ACTOR_EXPERIENCE_APPEALS:175,WORKPLACE_NEWSFEED_PROMOTED_POST:176,ASSET3D_PHOTO_FULLSCREEN:177,MARKETPLACE_MEGAMALL:178,CIVIC_PROPOSAL:179,WORKPLACE_DISCOVERY_FEED:180,CE_PII_AND_ATTACHMENTS_STRIPPED_FEED:182,SOURCERY_PII_STRIPPED:183,ACTOR_GATEWAY:191,FBR:192,NEWS_STORYLINE_NEWSFEED_QP:193,JOBS_SINGLE_GROUP_BROWSER:194,JOBS_MULTI_GROUP_BROWSER:195,ACTION_EXPERIENCE:196,GROUP_ALERTED_FEED:197,CANDIDATE_PACKET_REVIEW:198,BUSINESS_FEED:199,NEWS_OCT_DRAFT_POST_PREVIEW:200})}),null);
__d("PluginOptin",["DOMEvent","DOMEventListener","PlatformWidgetEndpoint","PluginLoggedOutUserTypedLogger","PluginMessage","PopupWindow","URI","UserAgent_DEPRECATED"],(function(a,b,c,d,e,f){__p&&__p();function g(a,c){Object.assign(this,{return_params:b("URI").getRequestURI().getQueryData(),login_params:{},optin_params:{},plugin:a,api_key:c}),this.addReturnParams({ret:"optin"}),delete this.return_params.hash}Object.assign(g.prototype,{addReturnParams:function(a){Object.assign(this.return_params,a);return this},addLoginParams:function(a){Object.assign(this.login_params,a);return this},addOptinParams:function(a){Object.assign(this.optin_params,a);return this},start:function(){var a=this.api_key||127760087237610;b("URI").getRequestURI().getQueryData().kid_directed_site&&(this.login_params.kid_directed_site=!0);this.login_params.referrer=document.referrer;var c=new(b("URI"))(b("PlatformWidgetEndpoint").dialog("plugin.optin")).addQueryData(this.optin_params).addQueryData({app_id:a,secure:b("URI").getRequestURI().isSecure(),social_plugin:this.plugin,return_params:JSON.stringify(this.return_params),login_params:JSON.stringify(this.login_params)});b("UserAgent_DEPRECATED").mobile()?c.setSubdomain("m"):c.addQueryData({display:"popup"});this.return_params.act!==null&&this.return_params.act==="send"&&new(b("PluginLoggedOutUserTypedLogger"))().setPluginAppID(a).setPluginName(this.return_params.act).setHref(this.return_params.href).logVital();this.popup=b("PopupWindow").open(c.toString(),420,450);b("PluginMessage").listen();return this}});g.starter=function(a,b,c,d){a=new g(a);a.addReturnParams(b||{});a.addLoginParams(c||{});a.addOptinParams(d||{});return a.start.bind(a)};g.listen=function(a,c,d,e,f){b("DOMEventListener").add(a,"click",function(a){new(b("DOMEvent"))(a).kill(),g.starter(c,d,e,f)()})};e.exports=g}),null);
__d("PluginFeedLikeButton",["Arbiter","AsyncFormRequestUtils","ClientIDs","CSS","DOM","DOMEventListener","FBFeedLocations","FormSubmit","Keys","PluginOptin","URI"],(function(a,b,c,d,e,f){__p&&__p();window.resetConfirmStoryLike=function(a){b("CSS").show(b("DOM").find(document,"#likeStory_"+a)),b("DOM").remove(b("DOM").find(document,"#confirmStory_"+a))};a={addClientId:function(a){a.setAttribute("value",b("ClientIDs").getNewClientID())},loggedOutLikeButton:function(a,c,d){var e="";if(c===b("FBFeedLocations").EMBED)e="post";else if(c===b("FBFeedLocations").PAGE_PLUGIN)e="page";else throw new Error("Invalid FBFeedLocation type.");c=new(b("PluginOptin"))(e).addReturnParams({act:"like_"+a});b("DOMEventListener").add(d,"click",c.start.bind(c))},init:function(a,c,d,e,f){__p&&__p();var g=function(a){if(a.type==="keypress")if(a.keyCode===b("Keys").RETURN||a.keyCode===b("Keys").SPACE)b("FormSubmit").send(f);else return;b("FormSubmit").send(f)};b("DOMEventListener").add(c,"click",g);b("DOMEventListener").add(d,"click",g);b("DOMEventListener").add(c,"keypress",g);b("DOMEventListener").add(d,"keypress",g);g=e.getAttribute("value")==="1";b("AsyncFormRequestUtils").subscribe(f,"send",function(f){f=e.getAttribute("value")==="1";b("CSS").conditionShow(d,f);b("CSS").conditionShow(c,!f);b("Arbiter").inform("embeddedUfiToggle",{isLike:f,storyToken:a});e.setAttribute("value",f?"":"1")});b("AsyncFormRequestUtils").subscribe(f,"response",function(f){f=f.response.payload;if(f&&!f.success){f=f.isLike;b("CSS").conditionShow(c,f);b("CSS").conditionShow(d,!f);b("Arbiter").inform("revertLike",{isLike:f,storyToken:a});e.setAttribute("value",f?"1":"")}});var h=new(b("URI"))(window.location.search).getQueryData();g&&h.act==="like_"+a&&b("FormSubmit").send(f)}};e.exports=a}),null);
__d("classWithMixins",[],(function(a,b,c,d,e,f){function a(a,b){var c=function(){a.apply(this,arguments)};c.prototype=Object.assign(Object.create(a.prototype),b.prototype);return c}e.exports=a}),null);