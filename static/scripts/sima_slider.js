
var slider_timer;

function SwitchGallery(dir){
    dir = SIMASlider.current_gallery + dir == galleries.length ? 0 : dir;
	dir = SIMASlider.current_gallery + dir == -1 ? 0 : dir;
	
	if(dir !=0){
		SIMASlider.current_gallery = SIMASlider.current_gallery + dir ; 	
		SIMASlider.images = galleries[SIMASlider.current_gallery].images;	
		SIMASlider.current_image = 0;
		SIMASlider.img.css('background-image', "url(" + '../../home/main/gallery/galleries/' + article.galleries + galleries[SIMASlider.current_gallery].dir + SIMASlider.images[SIMASlider.current_image]+ ")");
	}
	return dir;
}

function GalleryHitCheck(x,y){	  	
	 
		if(y>2*112){
			return 1;
		}
		if(y<112){
			return -1;
		}
	  
	 return 0;
}

function SwitchToSmallGallery(){
	console.log('Switching Gallery');
	var x = 0;
	if($(window).width() > 900) x = 200; //have padding (min 200)
	
	var min_pv = 50;
	zoom = ($(window).width()-x)/$('#SG0').width();
	if(($('#SG0').height()*zoom + min_pv*2) > $(window).height()){
		zoom= ($(window).height() - min_pv*2)/$('#SG0').height();
	}
	
	if(1){
		var w = $('#SG0').width()*zoom;
		var h = $('#SG0').height()*zoom;
		
		
		$('#GalleryView').height(h+min_pv*2);
		
		var pl = ($(window).width()-w)/2;
		var pt = ($('#GalleryView').height()-h)/2;
		
		console.log(pl)
		
		$('#Gallery').css({'padding-left':pl}).css({'padding-top':pt});
		
		$('#SG0').width(w).height(h);		
		$('#SIMAGalleryFrame').width(w).height(h);
		$('#SIMA_GallerySelect').css({'left':pl+w}).css({'top':pt+(h-336)/2});
		$('#SIMAGalleryFrame2_1').css({'left':pl+w}).css({'top':pt+(h-336)/2 + 0*112});
		$('#SIMAGalleryFrame2_2').css({'left':pl+w}).css({'top':pt+(h-336)/2 + 1*112});
		$('#SIMAGalleryFrame2_3').css({'left':pl+w}).css({'top':pt+(h-336)/2 + 2*112});
		$('#GallerCurL1').css({'left':pl}).css({'top':pt+h/2-50});
		$('#GallerCurR1').css({'left':pl+w-100}).css({'top':pt+h/2-50});
	}
}
function SIMASliderInit(){

	SIMASlider.temp=0;
	
	SIMASlider.el_sel  = [];
	SIMASlider.car_sel = [];
	
	SIMASlider.img = $('div[id^="SG{0}"]'.format([(0).toString()]));
	SIMASlider.current_gallery = galleries.length - 2 ; 
	SwitchGallery(1);
	
	
	var p;
	
	//SelectorPosition Initizialize
	for(var i=0;i<5;i++){
		SIMASlider.el_sel[i] = $('div[id^="SG{0}"]'.format([(i+6).toString()]));
		SIMASlider.car_sel[i]=i;
	}
	SIMASlider.indent_sel = SIMASlider.el_sel[0].outerHeight();
	p = -SIMASlider.indent_sel;
	for(var i=0;i<5;i++){
		SIMASlider.el_sel[i].css({'top' : p , left : 0});
		p  = p + SIMASlider.indent_sel;
		SIMASlider.el_sel[i].css('z-index',110+i);	
		//Clear
		SIMASlider.el_sel[i].empty();
	}
	
	p = 0 ;
	p = p - $('#SIMAGalleryFrame').outerHeight();
	$('#SIMAGalleryFrame').css('z-index',116);
	$('#SIMAGalleryFrame2_1').css('z-index',117);
	$('#SIMAGalleryFrame2_2').css('z-index',118);
	$('#SIMAGalleryFrame2_3').css('z-index',119);
	$('#GallerCurR1').css('z-index',120);
	$('#GallerCurL1').css('z-index',121);
	//$('#SIMAGalleryFrame').css({'top' : p , left : 0});
			
	//Fill up till ava
	var z = galleries.length > 3 ? 3 : galleries.length ;
	for(var i = 0 , j = galleries.length - 1 ; i < z ; i++,j--){
		SIMASlider.el_sel[2-i].append(galleries[j].tag);
	}
	
	$("#SIMAGalleryFrame2_1").mouseenter(function(){
		SIMASlider.el_sel[SIMASlider.car_sel[1]].css('color','rgb(190,190,190)');
	});
	$("#SIMAGalleryFrame2_1").mouseleave(function(){
		SIMASlider.el_sel[SIMASlider.car_sel[1]].css('color','rgb(255,255,255)');
	});
	$("#SIMAGalleryFrame2_1").click(function(event){
		event.stopPropagation();
		SIMASlider.el_sel[SIMASlider.car_sel[1]].css('color','rgb(255,255,255)');
		SIMASliderSelectRoll(SwitchGallery(-1));
	});
	$("#SIMAGalleryFrame2_3").mouseenter(function(){
		SIMASlider.el_sel[SIMASlider.car_sel[3]].css('color','rgb(190,190,190)');
	});
	$("#SIMAGalleryFrame2_3").mouseleave(function(){
		SIMASlider.el_sel[SIMASlider.car_sel[3]].css('color','rgb(255,255,255)');
	});
	$("#SIMAGalleryFrame2_3").click(function(event){
		event.stopPropagation();
		SIMASlider.el_sel[SIMASlider.car_sel[3]].css('color','rgb(255,255,255)');
		SIMASliderSelectRoll(SwitchGallery(1));
	});	
	
	$("#SIMAGallery").mouseenter(function(){
//		clearInterval(slider_timer);	
		$("#GallerCurR1").css('visibility','visible');
		$("#GallerCurL1").css('visibility','visible');
	});
	$("#SIMAGallery").mouseleave(function(){
//		slider_timer  = setInterval('slide("left")', 5000);
		$("#GallerCurR1").css('visibility','hidden');
		$("#GallerCurL1").css('visibility','hidden');
	});
	$("#GallerCurL1").click(function(event){
			event.stopPropagation();
			slide("left");
	});	
	$("#GallerCurR1").click(function(event){
			event.stopPropagation();
			slide("right");
	});	
	
//	clearInterval(slider_timer);
//	slider_timer  = setInterval('slide("left")', 5000);

}


function SIMASliderRun(dir){

		SIMASlider.current_image = SIMASlider.current_image + dir;
		
		
		SIMASlider.current_image = SIMASlider.current_image == SIMASlider.images.length ? 0 : SIMASlider.current_image;
		SIMASlider.current_image = SIMASlider.current_image == -1 ? SIMASlider.images.length-1 : SIMASlider.current_image;		
		
		if(SIMASlider.current_image==0){//Image reset to zero : roll !
			console.log("Switching Gallery !");
			SIMASliderSelectRoll(SwitchGallery(-1));
		}else{	
			console.log('fading out  s');		
			
			/*
			SIMASlider.img.fadeTo('slow', 0.3, function()
			{
				console.log('fading out  c');
				$(this).css('background-image', "url(" + '../../home/main/gallery/galleries/' + article.galleries + galleries[SIMASlider.current_gallery].dir + SIMASlider.images[SIMASlider.current_image] + ")").fadeTo('slow', 0.5 , function() {
				console.log('fading in c');
				});
			});
			*/
			SIMASlider.img.css('background-image', "url(" + '../../home/main/gallery/galleries/' + article.galleries + galleries[SIMASlider.current_gallery].dir + SIMASlider.images[SIMASlider.current_image] + ")")
		}
		
}

function SIMASliderSelectRoll(dir){
	
	if(dir !=0){
		var dp = dir == -1 ? -SIMASlider.indent_sel : SIMASlider.indent_sel;	
		if(dir == 1){		
			SIMASlider.el_sel[SIMASlider.car_sel[0]].css({'top' : 3*SIMASlider.indent_sel});		
			var p = -SIMASlider.indent_sel ;
			for(var i = 1 ; i < 5 ; i++){			
				SIMASlider.el_sel[SIMASlider.car_sel[i]].animate({'top' : p},500);
				p = p + SIMASlider.indent_sel ;
			}		
			SIMASlider.car_sel = SIMASlider.car_sel.slice(1,5).concat([SIMASlider.car_sel[0]]);	

			
		}else{
			SIMASlider.el_sel[SIMASlider.car_sel[4]].css({'top' : -SIMASlider.indent_sel});
			var p = 0 ;
			for(var i = 0 ; i < 4 ; i++){			
				SIMASlider.el_sel[SIMASlider.car_sel[i]].animate({'top' : p},500);
				p = p + SIMASlider.indent_sel ;
			}
			SIMASlider.car_sel = ([SIMASlider.car_sel[4]]).concat(SIMASlider.car_sel.slice(0,4));	
		}	

		for(var i=0;i<5;i++){
				SIMASlider.el_sel[SIMASlider.car_sel[i]].css('z-index',110+i);
		}	
	}
	
	
}

//slide function
function slide(where){	
	console.log('Runn')
	console.log(where)
	if(where=='left'){
		SIMASliderRun(1);
	}else{
		SIMASliderRun(-1);
	}
	
/*
	SIMASlider.temp++;
	if(SIMASlider.temp==5){
		SIMASlider.temp=0;
		SIMASliderSelectRoll(SwitchGallery(-1));
	}
*/    
}