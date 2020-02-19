function chkMobile(){

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
return isMobile;	
}

var articles=[];
var TabId   = 0;
var article_type = 'articles';
var ArticleElements = [];
ArticleElements.loaded = false;
if (!String.prototype.format) {
// This is the function.
		String.prototype.format = function (args) {
			var str = this;
			return str.replace(String.prototype.format.regex, function(item) {
				var intVal = parseInt(item.substring(1, item.length - 1));
				var replace;
				if (intVal >= 0) {
					replace = args[intVal];
				} else if (intVal === -1) {
					replace = "{";
				} else if (intVal === -2) {
					replace = "}";
				} else {
					replace = "";
				}
				return replace;
			});
		};
		String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
}
if (!String.prototype.replaceAll) {
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
}

function GetQueryString() {
			  // This function is anonymous, is executed immediately and 
			  // the return value is assigned to QueryString!
			  var query_string = {};
			  var query = window.location.search.substring(1);
			  var vars = query.split("&");
			  for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
					// If first entry with this name
				if (typeof query_string[pair[0]] === "undefined") {
				  query_string[pair[0]] = decodeURIComponent(pair[1]);
					// If second entry with this name
				} else if (typeof query_string[pair[0]] === "string") {
				  var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
				  query_string[pair[0]] = arr;
					// If third or later entry with this name
				} else {
				  query_string[pair[0]].push(decodeURIComponent(pair[1]));
				}
			  } 
				return query_string;
		};


function TabClicked(id){
	TabId = id;
	
	var p = 0;
	if(article_type=='articles') {
	  p = ($('#article_abs_1').outerHeight())*articles[id].start + 20;
	}else{
	  p = 0;
	  LoadDiscussionsList(article_type);
	}
	
	$('#variable_height').stop().animate({scrollTop:p}, '500', 'swing', function() { 							
	});
}



function ArticleClicked(title){
	console.log(title);
/*	
	window.sessionStorage.setItem("ArticleToLoad","articles/SCL");
	var title = '';
	for(var i= 0 , k = 0; i < articles.length ; i++){
		for(var j = 0 ; j < articles[i].article_list.length;j++){
			if(k == id){				
				title = articles[i].article_list[j].article_title;
				window.sessionStorage.setItem("ArticleToLoad",article_type + '/'+title);
			}
			k++;
		}
	}
*/
		
	if(article_type=='articles'){
	 window.location.href = "./main_article.html?articles={0}".format([encodeURIComponent(title)]);
	}else{
	 window.location.href = "./main_discussions.html?discussions={0}".format([encodeURIComponent(title)]);
	}
}

function GoToPage(type,title){
	if(type=='articles'){
		window.sessionStorage.setItem("ArticleToLoad",type + '/'+title);
		window.location.href = "./main_article.html?articles={0}".format([encodeURIComponent(title)]);
	}
	if(type=='discussions'){
		window.sessionStorage.setItem("ArticleToLoad",type + '/'+title);
		window.location.href = "./main_discussions.html?discussions={0}".format([encodeURIComponent(title)]);
	}
	if(type=='discussions_list'){
		window.sessionStorage.setItem('SectionToLoad',title);
		window.location.href = "./main_discussions_list.html";
	}
}

function LoadArticleList(type){
	article_type=type;
	jQuery.getJSON('../../home/main/'+ article_type +'/article_list.json',function(data){
		
		articles = data.articles;
		//Create Section Tabs	
		var t = $('#section_tabs');
		t.empty();
		for ( var i = articles.length-1 ; i >=0  ; i--){
			t.append('<div id="section_tab" onclick="TabClicked({1})"> {0} </div>'.format([articles[i].article_type,i.toString()]));
		}
		
		if(ArticleElements.loaded==false){
			ArticleElements.a1 = $('#article_abs_1').clone();
			ArticleElements.a2 = $('#article_abs_2').clone();
			ArticleElements.loaded = true;
		}
		
		//Create Sections		
		t = $('#variable_height');
		
		t.empty();
		t.append('<div id="spacer" style="height:20px"></div>');
		
		var k = 0;
		for ( var i = 0 ; i < articles.length ; i++){
		
			var article_list = articles[i].article_list;
			articles[i].start = k;
			for ( var j=0;j < article_list.length;j++){
			
				var el ;
				if( k%2==0){
					el =  ArticleElements.a1.clone();
				}else{
					el =  ArticleElements.a2.clone();
				}
				
				el.find('.article_abstract_title').empty().append(article_list[j].article_title);
				
				var url= 'url(../../home/main/'+ article_type + '/{0})'.format([encodeURIComponent(article_list[j].article_image)]);
				//url = encodeURIComponent(url.trim()) 			
				el.find('#article_abstract_image').css('background-image',url);				
			
				el.find('#article_abstract_text').empty().append(article_list[j].article_abstract);
				el.attr("id","article_abs_"+k.toString());
				el.attr("onclick","ArticleClicked('{0}')".format([article_list[j].article_title]));
				el.appendTo(t);
				
				k = k + 1;
			}
		}
		
		t.append('<div id="spacer" style="height:220px"></div>');
		//$('#variable_height').css('width',$( window ).width()-10) ;
		$('#variable_height').css('height',$( window ).height()) ;
		
		//Navigate to section
		 var section = window.sessionStorage.getItem('SectionToLoad');
		 if( typeof(section) != "undefined"){
			if(section != -1) TabClicked(section);
		 }
 
	});	
	
	if(chkMobile()==true) alert('Mobile');
}
function LoadDiscussionsList(type){
	article_type=type;
	jQuery.getJSON('../../home/main/'+ article_type +'/article_list.json',function(data){
		
		articles = data.articles;
		//Create Section Tabs	
		var t = $('#section_tabs');
		t.empty();
		for ( var i = articles.length-1 ; i >=0  ; i--){
			t.append('<div id="section_tab" onclick="TabClicked({1})"> {0} </div>'.format([articles[i].article_type[0],i.toString()]));
		}
		
		if(ArticleElements.loaded==false){
			ArticleElements.a1 = $('#article_abs_1').clone();
			ArticleElements.a2 = $('#article_abs_2').clone();
			ArticleElements.a3 = $('#article_abs_about').clone();
			ArticleElements.loaded=true;
		}
		//Create Sections		
		t = $('#variable_height');
		
		t.empty();
		t.append('<div id="spacer" style="height:20px;"></div>');
		
		var k = 0;
		//for ( var i = 0 ; i < articles.length ; i++){
			var i = TabId;
			console.log(i)
			var eh = ArticleElements.a3.clone();
			eh.find('#discuss_abstract_text').empty().append(articles[i].article_type[1]);
			eh.appendTo(t);
			var article_list = articles[i].article_list;
			articles[i].start = k;
			for ( var j=0;j < article_list.length;j++){
			
				var el ;
				if( k%2==0){
					el =  ArticleElements.a1.clone();
				}else{
					el =  ArticleElements.a2.clone();
				}
				
				el.find('.discuss_abstract_title').empty().append(article_list[j].article_title);
				
				var url= 'url(../../home/main/'+ article_type + '/{0})'.format([encodeURIComponent(article_list[j].article_image)]);
				//url = encodeURIComponent(url.trim()) 			
				el.find('#article_abstract_image').css('background-image',url);
				el.find('#discuss_abstract_text').empty().append(article_list[j].article_abstract);
				el.attr("id","article_abs_"+k.toString());
				el.attr("onclick","ArticleClicked('{0}')".format([article_list[j].article_title]));
				el.appendTo(t);
				
				k = k + 1;
			}
		//}
		
		t.append('<div id="spacer" style="height:220px;"></div>');
		//$('#variable_height').css('width',$( window ).width()-10) ;
		$('#variable_height').css('height',$( window ).height()) ;
		 
	});	
	
	//if(chkMobile()==true) alert('Mobile');
}

function LoadArticle(name){
	//Load Article
	console.log(name)
	var patt = new RegExp('articles', "i");
	jQuery.getJSON('../../home/main/' + name +'.json',function(data){
	
		article = data.article;				
			
		$('#article_title').empty().append(article.article_title);
		$('#article_text_text').empty().append(article.article);

		
		if(patt.test(name)==false){		
			$('#article_author_text').empty().append(article.about_author);	
			
			var url='url(../../home/main/authors/'+ encodeURIComponent(article.author_pic) + ')';
			//url = encodeURIComponent(url.trim()) 
			console.log(url)
			$('#author_image').css('background-image', url);					
			console.log($('#author_image').css('background-image'))
			
			url = "http://simaiisc.org/home/main/main_discussions.html?discussions=" + encodeURIComponent(name.substring(name.indexOf('/')+1));
			console.log(url)
			$('#fblikeplugin').empty().append('<div class="fb-like" data-href="{0}" data-width="650" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>'.format([url]));
			$('#fbcommentplugin').empty().append('<div class="fb-comments" data-href="{0}" data-width="650" data-numposts="5"></div>'.format([url]));
		}
		
		if(patt.test(name)){
			console.log('Fetching galleries');
			jQuery.getJSON('../../home/main/gallery/galleries/'+ article.galleries + '/gallery.json',function(data){
				galleries = data.galleries;
				console.log(galleries)
				SIMASliderInit();
			});
		}else{	
			console.log(article.pic)
			if(article.pic==""){
				console.log('Hide');
				$('#SIMAGallery').hide();
			}else{
				var url='url(../../home/main/discussions/' + encodeURIComponent(article.pic) + ')';
				//url = encodeURIComponent(url.trim())
				$('#SIMAGallery').css('background-image',url);
			}
		}
		
		//$('#variable_height').css('width',$( window ).width()-10) ;
		$('#variable_height').css('height',$( window ).height()) ;
	});
}

function LoadGallery(name){
	//Load Article
	console.log(name)
	 article.galleries = './' + name +'/';

		console.log('Fetching galleries');
		var url = '../../home/main/gallery/galleries/'+ encodeURIComponent(name) + '/gallery.json';
		//var url = '../../home/main/' + 'gallery/galleries/MUDRA/gallery' +'.json';
		console.log(url);
		jQuery.getJSON(url,function(data){
			galleries = data.galleries;
			console.log(galleries)
			SIMASliderInit();
		}).success(function() { console.log("second success"); })
		.error(function() { console.log("error"); })
		.complete(function() { console.log("complete"); });;
		
		/*
		$.ajax({
			url: '../../static/pics/galleries/'+ encodeURIComponent(name) + '/gallery.json',
			dataType: 'jsonp',
			jsonpCallback: function(data){
					
					console.log('some callb')
					console.log(data)
			}, // specify the callback name if you're hard-coding it
			success: function(data){
					console.log('data loaded')
					galleries = data.galleries;
					console.log(galleries)
					SIMASliderInit();
				}
			});
		*/
		//$('#variable_height').css('width',$( window ).width()-10) ;
		//$('#variable_height').css('height',$( window ).height()-260) ;
	
}


function SetMemberList(members){
        var t = $('#memt').empty();
		
		t.append(MemberData.xh);
		for(var i=0;i<members.length;i++){
		   var r ;
		   if(i%2==0){
			r = MemberData.x1.clone();
		   }else{
			r= MemberData.x2.clone();
		   }
		   r.find('.tIndex').empty().append((i+1).toString());
		   r.find('.tName').empty().append(members[i][0]);
		   r.find('.tCourse').empty().append(members[i][1]);
		   r.find('.tPlace').empty().append(members[i][2]);
		   t.append(r);
		}
}


function MemberSearch(field){
    var company = $('#Company').text();
	$('#Company').empty().append('Searching...');
	var list = [];
	MemberData.FileCount = MemberData.list.length;
	
	var patt = new RegExp(company, "i");
	
	var field_list;
	if(field == -1){
			field_list = [0,1,2];
	}else{
			field_list = [field];
	}
	
	for(var i = 0 ; i < MemberData.list.length ; i++){
	    var m;		
		jQuery.getJSON('../../home/main/members/' + MemberData.list[i] + '.json',function(data){
			     for(var j = 0;j<data.members.length;j++){
					for(var k = 0 ; k < field_list.length ; k++){
						if(patt.test(data.members[j][field_list[k]])){
							list.push(data.members[j]);
							break;
						}
					}
				 }				 
			   MemberData.FileCount=MemberData.FileCount-1;
				if(MemberData.FileCount==0){		
			     console.log("Search Complete...");
				 SetMemberList(list);
				 $('#Company').empty().append('');
			   }
		});

	}
	
}

function UpdateMemberData(year){
	  //window.location.href = "../../home/main/main_member_list.html";
	  jQuery.getJSON('../../home/main/members/' + year + '.json',function(data){
		console.log(data);
		MemberData.members = data.members;

		SetMemberList(MemberData.members);
		
	 });
 
}
function LoadMembers(year){

	if(MemberData.cloned==false){
		MemberData.cloned = true;
		MemberData.x1 = $('#mem1').clone();
		MemberData.x2 = $('#mem2').clone();
		MemberData.xh = $('#memh').clone();
	}
 jQuery.getJSON('../../home/main/members/list.json',function(data){
	
	console.log(data.list)
	MemberData.list=data.list;
	var t = $('#section_tabs').empty();
	for(var i=MemberData.list.length-1;i>=0;i--){
		t.append('<div id="section_tab" onclick=\'UpdateMemberData("'+ MemberData.list[i] + '")\'>' + MemberData.list[i] +'</div>');
	}
	
    UpdateMemberData(MemberData.list[0]);
 });  
}

var lastScroll=0;
var isSliding=false;

function setup_header_footer(){
	var pl = ($(window).width() - 768)/2 - 110;
	pl = pl < 0 ? 0 : pl;
	$('#top_bar_header').css('padding-left',pl);
	

$("#variable_height").scroll(function() {
	var x = $(this).scrollTop();
	//console.log([x,lastScroll])
	if((x - lastScroll) > 50){
		if(isSliding==false){
			isSliding=true;
			//console.log("UP");			
			$('#top_bar').stop().slideUp("slow");
			$('#spacer_top').stop().slideUp("slow",function(){
				//$('#section_header_top').stop().slideUp("slow");	
				isSliding=false;				
			});
			$('#section_title').stop().slideUp("slow",function(){});
		}
	}else{
		if(isSliding==false){
			isSliding=true;
			//console.log("DOWN");
			$('#top_bar').stop().slideDown("slow");
			$('#spacer_top').stop().slideDown("slow",function(){isSliding=false;});
		//$('#section_header_top').stop().slideUp("slow");
			$('#section_title').stop().slideDown("slow");
		}	
	}
    lastScroll = x;
});

//Add footer
//console.log($('#content').height())
$('#content').append(get_footer_string());


 
}

function footer_nav(page,section){
	console.log([page,section]);
	window.sessionStorage.setItem('SectionToLoad',section);
	window.location.href = '../../home/main/' + page + '.html';
}

function get_footer_string(){
			var s = '';
			s = s + '<div id="footer" style="margin-top:30px;border-top: 1px solid #000000;">				';
			s = s + '	<div style="height:30px"></div>';
			s = s + '	<div class="footer_box" style="width:160px">';
			s = s + '		<div class="footer_main" style="" onclick="footer_nav(\'main\',-1)"> HOME </div>';
			s = s + '		<div class="footer_main" style="" onclick="footer_nav(\'main_about\',-1)"> ABOUT US </div>';
			s = s + '		<div class="footer_main" style="" onclick="footer_nav(\'main_gallery\',-1)"> ARCHIVES </div>';
			s = s + '		<div class="footer_main" style="" onclick="footer_nav(\'main_member_list\',-1)"> MEMBERS </div>';
			s = s + '	</div>';
			s = s + '	<div class="footer_box">';
			s = s + '		<div class="footer_main" style="" onclick="footer_nav(\'main_article_list\',0)"> ACTIVITIES </div>';
			s = s + '		<div class="footer_sub" style="" onclick="footer_nav(\'main_article_list\',0)"> CULTURAL </div>';
			s = s + '		<div class="footer_sub" style="" onclick="footer_nav(\'main_article_list\',1)"> SPORTS </div>';
			s = s + '		<div class="footer_sub" style="" onclick="footer_nav(\'main_article_list\',2)"> CELEBRATIONS </div>';
			s = s + '		<div class="footer_sub" style="" onclick="footer_nav(\'main_article_list\',3)"> GET-TOGETHERS </div>';
			s = s + '		<div class="footer_sub" style="" onclick="footer_nav(\'main_article_list\',4)"> INITIATIVES </div>';
			s = s + '	</div>';
			s = s + '	<div class="footer_box" style="width:200px">';
			s = s + '		<div class="footer_main" style="" onclick="footer_nav(\'main_discussions_list\',0)"> ARTICLES </div>';
			s = s + '		<div class="footer_sub" style="" onclick="footer_nav(\'main_discussions_list\',0)"> BMW@IISc </div>';
			s = s + '		<div class="footer_sub" style="" onclick="footer_nav(\'main_discussions_list\',1)"> OPEN PAGES </div>';
			s = s + '		<div class="footer_sub" style="" onclick="footer_nav(\'main_discussions_list\',2)"> REMINISCENCES  </div>';
			s = s + '	</div>';
			s = s + '	<div class="footer_box">';
			s = s + '		<div class="footer_main">';
			s = s + '			<p><b>CONTACT US</b></p>';
			s = s + '			<p>Secretary, SIMA</p>';
			s = s + '			<p>IISc Bangalore</p>';
			s = s + '			<p>secretary.sima.iisc@gmail.com</p>';
			s = s + '		</div>';
			s = s + '	</div>';
			s = s + '</div>';
			return s;
}