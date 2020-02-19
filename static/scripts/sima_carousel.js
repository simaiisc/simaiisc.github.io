
    var image_id = 0 ; 
	var nImages  = 12;
	
	var imgs = new Array();
	var img_bk = [];
	var sima_carousel_context; 
 // Add a new Canvas and position 
    
     
	var timer=null; 
	var timer_main=null;
	var CarouselConfig =[]; 
    //Call setup to configure the Canvas 
    
         
    var t = 0;
	var nt = 35;
    var current_order = 0;
	var current_l_image = 0;
	var aCarouselDir = -1;
	var Carousel_AutoRun = false;
	//var image_load_sequence = [3,4,2,5,1,0,11,10,9,8,7,6];
	var image_load_sequence = [3,4,2,5,1,0,6,7,8,9,10,11];
	
	var setTime =  []; 
	var OnHover = false;
	var isAnimationRunning=false;
	
	var bglist = [];
	
	setup(); 
	
	
	
    function setup() { 
	
		var w = $( window ).width();
		w = w > 1024 ? 1024: w;
		//w = 768;
		$('#content').width(w);
		$('#SIMA_MainCarousel').width(w);
		
		var zoom = w/768;		
		$('#SIMA_MainCarousel').height($('#SIMA_MainCarousel').height()*zoom);	
		$('#CarCL').width($('#CarCL').width()*zoom).height($('#CarCL').height()*zoom);
		$('#CarCR').width($('#CarCR').width()*zoom).height($('#CarCR').height()*zoom).css({left:$('#CarCR').position().left*zoom});
		//console
		
		if(w>1000){
			$('.main_ic_container').css({'margin-left' : parseInt($('.main_ic_container').css('margin-left'))*zoom*2})
			$('.main_ic_container').css({'margin-right' : parseInt($('.main_ic_container').css('margin-right'))*zoom*2})		
	    	$('#UpcomingContainer').css({'margin-left' : '60px'});
		}
		
		//$('#SIMA_MainCarousel').hover(MouseOnCarousel,MouseOffCarousel);
		$('#CarCL').click( function(event){event.stopPropagation();aCarouselDir=-1;RunCarousel(-1);});
		$('#CarCR').click( function(event){event.stopPropagation();aCarouselDir=1 ;RunCarousel(1);});
		$('#SIMA_MainCarousel').click(function(){
			console.log('Gal');
			console.log(bglist[current_l_image].gallery);
			
			window.sessionStorage.setItem("GalleryToLoad",bglist[current_l_image].gallery);
			window.location.href = "./main_gallery.html";
		});
        var canvas=document.getElementById("my-canvas"); 
		
		CarouselConfig.carousel_height = 275;
		CarouselConfig.main_img_width  = 456;
		//Config = [zoom,xloc,opacity,shadow_strength,filter_opacity]
		//CarouselConfig.config = [[0.5,0,0,0,[127,127,127,0.9]],[0.7,-3,1,0,[158,29,90,0.7]],[0.89,61,1,0,[190,190,0,0.6]],[0.95,160,1,1,[127,127,127,0]],[0.89,296,1,0,[0,127,64,0.4]],[0.7,451,1,0,[121,66,111,0.7]],[0.5,451,0,0,[127,127,127,0.9]]];
		
		CarouselConfig.config = [[0.5,0,0,0,[0,127,64,0.9]],[0.7,-3,1,0,[0,127,64,0.7]],[0.89,61,1,0,[0,127,64,0.4]],[0.95,160,1,1,[127,127,127,0]],[0.89,296,1,0,[0,127,64,0.4]],[0.7,451,1,0,[0,127,64,0.7]],[0.5,451,0,0,[0,127,64,0.9]]];
		
		CarouselConfig.carousel_height = CarouselConfig.carousel_height*zoom;
		CarouselConfig.main_img_width  = CarouselConfig.main_img_width*zoom;		
		for (var i = 0 ; i < 7;i++){
		   CarouselConfig.config[i][1] = CarouselConfig.config[i][1]*zoom;
		}
		
		sima_carousel_context = canvas.getContext("2d"); 
        canvas.width=w;
		canvas.height=CarouselConfig.carousel_height;		
	    CarouselConfig.DrawOrder = [[0,1,5,2,4,3],[5,0,4,1,3,2],[0,1,5,2,4,3]];
		current_order = 0;
		
		CarouselConfig.tween = [];
		for(var i = 0 ; i < nt + 1 ; i++){
			var x = ((i/(nt)) - 0.5)*12;
			CarouselConfig.tween[i] = 1/(1+Math.exp(-x));
			
		}
		//console.log(CarouselConfig.tween)
		//Load Image List
		jQuery.getJSON('../../static/pics/main/bglist.json',function(data){
			bglist = data.background_images;
			OnImageLoad();
		});
		
		
    } 
	
	function MouseOnCarousel(){
		//OnHover = true;
		console.log("In");
		stopTimer() ;
		Carousel_AutoRun = false;
		$('#CarCL').css('visibility','visible');
		$('#CarCR').css('visibility','visible');
		//if(isAnimationRunning){current_order=1;DrawImages(1,false);}
		//else {current_order=0;DrawImages(0,false);}
	}
	function MouseOffCarousel(){
		//OnHover=false;
		console.log("Out");
		$('#CarCL').css('visibility','hidden');
		$('#CarCR').css('visibility','hidden');
		Carousel_AutoRun = true;
		RunCarousel(aCarouselDir);
	}

    function OnImageLoad(){
	
	    if(image_id < nImages){
			var imid = image_load_sequence[image_id];
			imgs[imid] = new Image() ;
		//imgs[image_id] .src = '../../static/pics/main/' + background_images[image_id] + '.jpg';	
			imgs[imid] .src = '../../static/pics/main/' + bglist[imid].image; //'bg{0}'.format([(imid+1).toString()]) + '.jpg';	
			imgs[imid] .onload = OnImageLoad;			
						
			
			//Partial Drawing Carousel
			if(image_id==1){				
				sima_carousel_context.clearRect(0, 0, sima_carousel_context.canvas.width,sima_carousel_context.canvas.height);
				DrawImageOnCanvas(imgs[image_load_sequence[0]],3,2,0);				
			}
			if(image_id==3){
				sima_carousel_context.clearRect(0, 0, sima_carousel_context.canvas.width,sima_carousel_context.canvas.height);
				DrawImageOnCanvas(imgs[image_load_sequence[2]],2,1,0);
				DrawImageOnCanvas(imgs[image_load_sequence[1]],4,3,0);
				DrawImageOnCanvas(imgs[image_load_sequence[0]],3,2,0);
			}
			if(image_id==5){
				sima_carousel_context.clearRect(0, 0, sima_carousel_context.canvas.width,sima_carousel_context.canvas.height);
				DrawImageOnCanvas(imgs[image_load_sequence[4]],1,0,0);
				DrawImageOnCanvas(imgs[image_load_sequence[3]],5,4,0);
				DrawImageOnCanvas(imgs[image_load_sequence[2]],2,1,0);
				DrawImageOnCanvas(imgs[image_load_sequence[1]],4,3,0);
				DrawImageOnCanvas(imgs[image_load_sequence[0]],3,2,0);
				setTime = new Date().getTime();
				
			}
			if(image_id>5){				
				if(setTime + 2000 < new Date().getTime()){
					Carousel_AutoRun=false;
					RunCarousel(aCarouselDir);
					setTime = new Date().getTime();
				}
			}
			image_id = image_id + 1;
		}else{
			img_bk = new Image() ;
			img_bk.src = '../../static/pics/main/' + 'bg_frame.png';
			console.log('Loaded Images');
			stopTimer();
			Carousel_AutoRun=true;
			RunCarousel(aCarouselDir);
		}
	}
	
	
	function DrawImageOnCanvas(image,config_id_s,config_id_e,l){
	    //console.log([image_id,config_id_s,config_id_e,l])
		
		var tweened_val = [0,0,0,0,[0,0,0,0]];
		
		for(var i = 0 ; i < 4 ; i++){
			tweened_val[i] = CarouselConfig.config[config_id_s][i] + (CarouselConfig.config[config_id_e][i]-CarouselConfig.config[config_id_s][i])*l;
		}
		for(var i = 0 ; i < 4 ; i++){
			tweened_val[4][i] = CarouselConfig.config[config_id_s][4][i] + (CarouselConfig.config[config_id_e][4][i]-CarouselConfig.config[config_id_s][4][i])*l;
		}
		var zoom   = tweened_val[0];
		var xloc   = tweened_val[1];
		var alpha  = tweened_val[2];		
		var shadow = tweened_val[3];		
		var filter = tweened_val[4];
		
		var yloc = CarouselConfig.carousel_height*(1-zoom)*0.5;
		var height = CarouselConfig.carousel_height*zoom;
		var width = CarouselConfig.main_img_width*zoom;
		
		sima_carousel_context.globalAlpha = 1;
		sima_carousel_context.shadowBlur=10*shadow;
		sima_carousel_context.shadowColor="white";
		sima_carousel_context.fillStyle='rgba(255,255,255,0)';
		sima_carousel_context.fillRect(xloc,yloc,width,height);
		
		sima_carousel_context.globalAlpha = alpha;
		sima_carousel_context.drawImage(image,0,0,image.naturalWidth,image.naturalHeight,xloc,yloc,width,height);
		
		sima_carousel_context.globalAlpha = 1;
		sima_carousel_context.shadowBlur=0;
		//sima_carousel_context.fillStyle = 'rgba({0},{1},{2},{3})'.format([filter[0].toString(),filter[1].toString(),filter[2].toString(),filter[3].toString()]);
		//console.log(filter)
		for(var i=0;i<3;i++) filter[i] = Math.floor(filter[i]);
		sima_carousel_context.fillStyle = 'rgba({0},{1},{2},{3})'.format([filter[0].toString(),filter[1].toString(),filter[2].toString(),filter[3].toString()]);
		sima_carousel_context.fillRect(xloc,yloc,width,height);	
		
	}
	function RunCarousel(CarouselDir){
	    t = 0;
		current_order=0;
		//console.log(current_l_image)
		isAnimationRunning=true;
		DrawImages(CarouselDir);
	}
	function DrawImages(CarouselDir){
		sima_carousel_context.clearRect(0, 0, sima_carousel_context.canvas.width,sima_carousel_context.canvas.height);
		var l =CarouselConfig.tween[t];// t/nt;
	
		for(var i=0;i<CarouselConfig.config.length-1;i++){
		  var j = CarouselConfig.DrawOrder[current_order][i];
		  var imid = current_l_image + j;
		  imid = imid > (imgs.length - 1) ? imid - imgs.length : imid ;
		  if(CarouselDir==1)   DrawImageOnCanvas(imgs[imid],j,j+1,l);
		  else DrawImageOnCanvas(imgs[imid],j+1,j,l);
		}
		//if(OnHover==true){
		//	DrawImageOnCanvas(img_bk,3,2,0);
		//}
		t = t + 1;
		if(t==nt/2){
			current_order = CarouselDir==1?1:2;
		}
		if(t<nt){
		  timer = setTimeout(function() {DrawImages(CarouselDir)},20); 
		}else{
			//isAnimationRunning=false;
			//if(IncrementOnDone){
			current_l_image = current_l_image - CarouselDir ;
			current_l_image = current_l_image == imgs.length ? 0 : current_l_image;
			current_l_image = current_l_image == -1 ? imgs.length-1 : current_l_image;
			//}
			if(Carousel_AutoRun == true){
				timer_main = setTimeout(function() {RunCarousel(CarouselDir)},2000); 
			}
		}
	}
	
   
     
    function stopTimer() { 
        clearTimeout(timer_main);     
		//clearTimeout(timer);   
    } 
     
   
 
 