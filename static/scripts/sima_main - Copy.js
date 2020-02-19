

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

function DeterminePositionInCarousel(id){
	for(var i = 0 ; i < 6 ; i++){
		if(carousel.car[i]==id) return i;
	}
	return -1;
}
function OnCarouselClick(ev){
	console.log(carousel.background_images[carousel.elbgid[ev.data]].gallery)
}
function OnCarouselMouseOver(ev){
	//console.log(ev.data)
}

function car_slide(car,dir){
	if(car==2) return;
	var p=0;
	var car_to_move = (car == 0)||(car == 1) ? car + 1: car ;
	p = carousel.el[carousel.car[car_to_move]].position().left;
	
	var pf = 0;
	if(dir == 1){		
		if((car_to_move == 1)||(car_to_move == 2)){
			pf = (carousel.p[car_to_move] + carousel.slide_w);
		} else {
			pf = (carousel.p[car_to_move] - carousel.slide_w);
		}
	}else{
		pf = carousel.p[car_to_move];	
	}
	
	
	carousel.el[carousel.car[car_to_move]].stop();
	carousel.el[carousel.car[car_to_move]].animate({left: "+={0}px".format([pf-p])}, carousel.slide_t );
}


function OnCarouselEnter(ev){
	
	carousel.run = false;
	carousel.slide_car_id = DeterminePositionInCarousel(ev.data);
	console.log('Enter {0}'.format([carousel.slide_car_id]));
	car_slide(carousel.slide_car_id,1);
	
}

function OnCarouselExit(ev){
	carousel.slide_car_id = DeterminePositionInCarousel(ev.data);
	console.log('Exit {0}'.format([carousel.slide_car_id]));	
	car_slide(carousel.slide_car_id,-1);
	carousel.run = true;
}


function SetupCarousel(){

	console.log('Setting Up !')
	//Pre Config
	carousel.el = [];
	carousel.elbgid = [];
	carousel.w  = [];
	carousel.p  = [];
	carousel.car = [];
	carousel.last_bgid = 0;
	carousel.run = true;
	
	for (var i=0;i<6;i++){
		carousel.el[i] = $("div[name='mainbg{0}']".format([i.toString()]));
		carousel.w[i] = carousel.el[i].width();		
		
	}
	var p = 0;
	for (var i = 0; i < 6;i++){
		carousel.el[i][0].style.backgroundImage = "url(" + '../../static/pics/main/' + carousel.background_images[i].image + ")";
		carousel.last_bgid = i;
		carousel.elbgid[i] = i;
		carousel.el[i].width(carousel.w[2]);
		carousel.el[i].animate({left: '+={0}px'.format([p])}, 1);
		
		carousel.el[i].click(i,OnCarouselClick);
		carousel.el[i].mouseover(i,OnCarouselMouseOver);
		carousel.el[i].mouseenter(i,OnCarouselEnter);
		carousel.el[i].mouseleave(i,OnCarouselExit);
		
		carousel.p[i] = p;
		p = p + carousel.w[i] ;	
		
		
		carousel.car[i] = i;
		
		
	}
	
	//View Blocker
	var b =  $("div[name='mainbg6']")
	p = p - carousel.w[5] ;
	b.animate({left: '+={0}px'.format([p])}, 1);	
	b.css('z-index',101);
	
	//Post Config
	carousel.slide_w = carousel.w[0]-20;
	carousel.slide_t = 500;
}


function LoopBackGroundImage(){
	var image_id = 0 ; 
	var next_image=0 ; 
	
	
	var SwitchingTime = 7000;
	var fadeTime = 1000;
	var fadeOpacity = 0;
	var imgs = new Array();	
	jQuery.getJSON('../../static/pics/main/bglist.json',function(data){
		carousel.background_images = data.background_images;
		SetupCarousel();		
		OnImageLoad();		
	});	
	
	function SwitchImage(){
		image_id = next_image;		
		main[0].style.backgroundImage = "url(" + imgs[image_id].src + ")"; ;	
	}

	
	
	function RunCarousel(){
		if (carousel.run == false) return;
		
		var moveTime = 700;
		//Roll Elements
		carousel.el[carousel.car[0]].animate({left: "+={0}px".format([carousel.p[5]])}, moveTime);
		for(var i = 0 ; i < 5 ; i++){
			carousel.el[carousel.car[i+1]].animate({left: "-={0}px".format([carousel.p[i+1]-carousel.p[i]])}, moveTime);
		}	
		
		//Roll List
		var cd = carousel.car[0];
		for(var i = 0 ; i < 5; i++){
			carousel.car[i] = carousel.car[i+1];
		}	
		carousel.car[5] = cd;
		
		//Correct z-index
		for(var i = 0 ; i < 5 ; i++){
			carousel.el[carousel.car[i]].css('z-index',95+i);
		}
		carousel.el[carousel.car[5]].css('z-index',94);
		
		//Update the next hidden image
		carousel.last_bgid = carousel.last_bgid==carousel.background_images.length - 1? 0 : carousel.last_bgid + 1;
		carousel.el[carousel.car[5]][0].style.backgroundImage = "url(" + '../../static/pics/main/' + carousel.background_images[carousel.last_bgid].image + ")";
		carousel.elbgid[carousel.car[5]] = carousel.last_bgid;
	}
	
	
	var  prev = new Date();
	function ChangeBackGroundImage(){		
		//next_image = image_id ==  (background_images.length -1) ? 0 : image_id + 1 ;
		//main.fadeTo(fadeTime,fadeOpacity,ImageAppear) ;		
		RunCarousel();		
		var now = new Date();
		setTimeout(ChangeBackGroundImage, Math.max(0, Math.min(SwitchingTime, 2*SwitchingTime - (now - prev))));
		prev = now;			
	}
	
	function OnImageLoad(){
		/*
		if (image_id < carousel.background_images.length){	
			imgs[image_id] = new Image() ;
			imgs[image_id] .src = '../../static/pics/main/' + carousel.background_images[image_id].image;	
			imgs[image_id] .onload = OnImageLoad;
			image_id = image_id + 1;
		}
		else{
		*/
			image_id = 0;
			setTimeout(ChangeBackGroundImage, SwitchingTime);
		//}
	}
	
		
}

function SIMASliderInit(){

	SIMASlider.el=[];
	SIMASlider.car=[];
	
	SIMASlider.el_sel  = [];
	SIMASlider.car_sel = [];
	jQuery.getJSON('../../static/pics/main/bglist.json',function(data){
			SIMASlider.images = data.background_images;	
			
			//Slider Positions Initialize
			for (var i=0;i<3;i++){
				SIMASlider.el[i] = $('div[id^="SG{0}"]'.format([i.toString()]));
				SIMASlider.car[i]=i;
			}
			
			SIMASlider.indent = SIMASlider.el[2].outerWidth();
			
			//Bring all on same level
			var p = 0;
			for (var i=0;i<3;i++){
				SIMASlider.el[SIMASlider.car[i]].css({'top' : p , left : 0});
				p = p - SIMASlider.el[i].outerHeight();
				SIMASlider.el[SIMASlider.car[i]].css('z-index',95+i);
			}
			//Slide off top  
			SIMASlider.el[2].animate({'left' : -SIMASlider.indent},0);
			SIMASlider.current_image = 0;
			SIMASliderSetImages(1);	

			
			
			//SelectorPosition Initizialize
			for(var i=0;i<5;i++){
				SIMASlider.el_sel[i] = $('div[id^="SG{0}"]'.format([(i+6).toString()]));
				SIMASlider.car_sel[i]=i;
			}
			SIMASlider.indent_sel = SIMASlider.el_sel[0].outerHeight();
			p = -SIMASlider.indent_sel;
			p=0;
			for(var i=0;i<5;i++){
				SIMASlider.el_sel[i].css({'top' : p , left : 0});
				p  = p + SIMASlider.indent_sel;
				SIMASlider.el_sel[i].css('z-index',110+i);
			}
			
			
			
	});	
	

}

function SIMASliderSetImages(dir){

	SIMASlider.current_image = SIMASlider.current_image + dir;
	SIMASlider.current_image = SIMASlider.current_image == SIMASlider.images.length ? 0 : SIMASlider.current_image;
	SIMASlider.current_image = SIMASlider.current_image == -1 ? SIMASlider.images.length-1 : SIMASlider.current_image;
	
	
	var imid ;
	SIMASlider.el[SIMASlider.car[1]][0].style.backgroundImage = "url(" + '../../static/pics/main/' + SIMASlider.images[SIMASlider.current_image].image + ")";
	imid = SIMASlider.current_image==0 ? SIMASlider.images.length-1 : SIMASlider.current_image-1;
	SIMASlider.el[SIMASlider.car[2]][0].style.backgroundImage = "url(" + '../../static/pics/main/' + SIMASlider.images[imid].image + ")";
	imid = SIMASlider.current_image==SIMASlider.images.length-1 ? 0 : SIMASlider.current_image+1;
	SIMASlider.el[SIMASlider.car[0]][0].style.backgroundImage = "url(" + '../../static/pics/main/' + SIMASlider.images[imid].image + ")";
	
}
function SIMASliderRun(dir){
		if(dir== 'right'){
			
				//Send the top one to bottom
				
				//Fix order				
				SIMASlider.car = [SIMASlider.car[2],SIMASlider.car[0],SIMASlider.car[1]]
				for(var i=0;i<3;i++){
					SIMASlider.el[SIMASlider.car[i]].css('z-index',95+i);
				}
				//Slide to bottom to nominal
				SIMASlider.el[SIMASlider.car[0]].css({'left' : 0});
				//Slide to to left
				SIMASlider.el[SIMASlider.car[2]].animate({'left' : -SIMASlider.indent},500,function(){
					SIMASliderSetImages(1);
				});
				
				
				
		}else{
				
				//Slide to to right
				SIMASlider.el[SIMASlider.car[2]].animate({'left' : 0},500,function(){
				//Fix order	
				SIMASlider.car = [SIMASlider.car[1],SIMASlider.car[2],SIMASlider.car[0]]
				for(var i=0;i<3;i++){
					SIMASlider.el[SIMASlider.car[i]].css('z-index',95+i);
				}
				//Position on left
				//Slide to bottom to nominal
				SIMASlider.el[SIMASlider.car[2]].css({'left' : -SIMASlider.indent});
				SIMASliderSetImages(-1);
				});
				
		}
}

function SIMASliderSelectRoll(dir){
	
	var dp = dir == 'top' ? -SIMASlider.indent_sel : SIMASlider.indent_sel;	
	
	if(dir == 'top'){		
		SIMASlider.el_sel[SIMASlider.car_sel[0]].css({'top' : 3*SIMASlider.indent_sel});		
		var p = -SIMASlider.indent_sel ;
		for(var i = 1 ; i < 5 ; i++){			
			SIMASlider.el_sel[SIMASlider.car_sel[i]].animate({'top' : p},501);
			p = p + SIMASlider.indent_sel ;
		}
		/*
		SIMASlider.el_sel[SIMASlider.car_sel[4]].animate({'top' : p},501,function(){
			SIMASlider.car_sel = SIMASlider.car_sel.slice(1,5).concat([SIMASlider.car_sel[0]]);	
			for(var i=0;i<5;i++){
				SIMASlider.el_sel[SIMASlider.car_sel[i]].css('z-index',110+i);
			}
		});	
		*/
		SIMASlider.car_sel = SIMASlider.car_sel.slice(1,5).concat([SIMASlider.car_sel[0]]);	
		for(var i=0;i<5;i++){
				SIMASlider.el_sel[SIMASlider.car_sel[i]].css('z-index',110+i);
		}
		
	}	

	
	
	
	
}

//FUNCTIONS BELLOW

//slide function
function slide(where){

	
			//SIMASliderRun(where);
			SIMASliderSelectRoll('top');
					
 return false;
}