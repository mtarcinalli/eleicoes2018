/*
 * Barra de busca da Folha de S.Paulo - 2015/06/30 19:00
 */
( function() {
var fol_topbar = {
	collection: [
		{ "title": "Opinião" , "url": "https://www1.folha.uol.com.br/opiniao" } ,
		{ "title": "Política" , "url": "https://www1.folha.uol.com.br/poder" } ,
		{ "title": "Mundo" , "url": "https://www1.folha.uol.com.br/mundo" } ,
		{ "title": "Economia" , "url": "https://www1.folha.uol.com.br/mercado" } ,
		{ "title": "Cotidiano" , "url": "https://www1.folha.uol.com.br/cotidiano" } ,
		{ "title": "Esporte" , "url": "https://www1.folha.uol.com.br/esporte" } ,
		{ "title": "Cultura" , "url": "https://www1.folha.uol.com.br/ilustrada" } ,
		{ "title": "F5" , "url": "https://f5.folha.uol.com.br" } ,
		{ "title": "TV Folha" , "url": "https://www1.folha.uol.com.br/tv" } ,
		{ "title": "Sobre Tudo" , "url": "https://www1.folha.uol.com.br/sobretudo" }
	] ,
	site: [
		{ "title": "Site" , "value": "online" } , { "title": "Impresso" , "value": "jornal" } , { "title": "Guia Folha" , "value": "online/guia" }
	] ,
	style: '\
	<style type="text/css">\
	#folha-topbar-search {background: #ededed; height: 41px; overflow: hidden; position: relative; text-align: center; z-index: 999999 }\
	#folha-topbar-search * { -webkit-box-sizing: border-box; -moz-box-sizing: border-box;  box-sizing: border-box; }\
	#folha-topbar-search label { float: left; line-height: 24px; font: 700 12px/1.2 Verdana, sans-serif; color:#000; margin-right: 10px; line-height:24px; }\
	#folha-topbar-search .folha-content-search { font: 700 12px/1.2 Verdana, sans-serif; margin: 0 auto; height: 28px; padding-top: 4px; text-align: left; max-width: 75.463rem; width: 100%; }\
	#folha-topbar-search .nav::-webkit-scrollbar { width:10px; background:#f5f5f5 !important; }\
	#folha-topbar-search .nav::-webkit-scrollbar-track { background: rgba(245, 245, 245, 1) !important; }\
	#folha-topbar-search .nav::-webkit-scrollbar-thumb { border-radius:10px !important; background:#c2c2c2 !important;  }\
	#folha-topbar-search ul.nav { float: left; height: auto; margin: 0 0 0 90px; padding: 0; width: 700px; }\
	#folha-topbar-search ul.nav li { float: left; font-weight: normal; list-style: none; line-height: 30px; padding: 0 8px; position: relative; }\
	#folha-topbar-search ul.nav li a { color: #666; cursor: pointer; font-size: 13px; text-decoration: none; }\
	#folha-topbar-search ul.nav li:hover a { color: #00aeef; }\
	#folha-topbar-search ul.nav li:hover a:before { background-color: #00aeef; }\
	#folha-topbar-search .folha-logo { background: url(https://f.i.uol.com.br/folha/furniture/5/images/sprite-topo-cinza-folha.png) no-repeat 0 0; display: block; float: left; height: 21px; overflow: hidden; margin: 3px 0 0 0; text-indent: -9999px; width: 170px; }\
	#folha-topbar-search .folha-search-assine { color: #666; margin: 5px 0 0 0; float: right; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 14px; text-decoration: none; }\
	#folha-topbar-search .box-assine { width: 118px; display: inline-block; float: right; }\
	#folha-topbar-search .image-check { background: url(https://f.i.uol.com.br/folha/furniture/5/images/sprite-topo-cinza-folha.png) no-repeat 0 -22px; float: left; margin: 7px 0 0 0; width: 16px; height: 12px; }\
	#folha-topbar-search .folha-search-assine:hover { text-decoration: underline; }\
	#folha-topbar-search .folha-search-sections { float: left; }\
	#folha-topbar-search select { border: 1px solid #ccc; float: left; height: 24px; margin: 0 5px; padding:0; font: 400 13px Arial, sans-serif;  background:#fff; -webkit-appearance:menulist !important; color:#000; }\
	#folha-topbar-search select::-ms-expand{ display:block }\
	#folha-topbar-search .select-section { width: 131px; }\
	#folha-topbar-search .select-site { width: 90px; }\
	#folha-topbar-search .box-search { height: 26px; width: auto; position: relative;}\
	#folha-topbar-search .folha-search-query { border: 1px solid #ccc; height: 24px; font: 400 13px/1.5 Arial, sans-serif; width: 139px; padding: 1px 0 0 20px; background:#fff; float: left;  color:#666; font-style: italic; }\
	#folha-topbar-search .folha-search-btn { background: url(https://f.i.uol.com.br/folha/furniture/5/images/folha-barra_busca.png) no-repeat right 1px #900; border: 0; cursor: pointer; height:22px; text-indent: -9999px; width: 57px; }\
	@media only screen and (max-width : 990px) { #folha-topbar-search .box-assine, #folha-topbar-search ul.nav { display: none; } #folha-topbar-search .folha-logo { float: none; left: 45%; margin-left: -65px; margin-top: -50px; position: absolute; top: 58px; } }\
	</style>' ,
	init: function () {
		if ( this.collection.length > 0 ) { this.prepare() ; }
	} ,
	prepare: function () {
		this.mount() ;
	} ,
	mount: function () {
		var base = this , html = [] , len = base.collection.length , site_len = base.site.length ;

		html.push( '<div class="full"><div id="folha-topbar-search"><div class="folha-content-search"><a href="https:\/\/www.folha.uol.com.br" class="folha-logo" title="Folha de S.Paulo">Folha de S.Paulo<\/a><ul class="nav">' ) ;

		// Editorias
		for ( var i = 0 ; i < len ; i++ ) {
			html.push( '<li><a href="' + base.collection[i].url + '/">' + base.collection[i].title + '</a></li>' ) ;
		}

		// Busca
		html.push( '<\/ul><div class="box-assine"><div class="image-check"></div><a class="folha-search-assine" href="https://assine.folha.com.br/folha/assinatura/?gid=FOL">Assine a Folha</a></div>' ) ;

		html.push( '<\/div><\/div><\/div>' ) ;

		document.write( base.style + html.join( "" ) ) ;
	}
} ;

fol_topbar.init() ;
} )( window ) ;




