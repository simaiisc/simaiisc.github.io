
var main_timer = [];

function MainGalleryAnimate(){
console.log('flip!');
flip();flip();
}

function MainGallerySetup(){
	jQuery.getJSON('../../home/main/gallery/galleries.json',function(data){
		MainGallery.galleries = data.galleries;
		MainGallery.el = [];
		MainGallery.slided = [];
		var n = MainGallery.galleries.length;
		for(var i = 0 ; i < n ; i++){
		   MainGallery.el[i] =  $('#SMG_I{0}'.format([(i+1).toString()]));		  
		   MainGallery.el[i].css('background-image', "url(" + '../../home/main/gallery/'+ MainGallery.galleries[i].pic + ")");
		   MainGallery.el[i].attr('gallery',i)
		   //MainGallery.el[i].append(i.toString());
		   MainGallery.slided[i] = 0;
		}
		
		MainGallery.slide_length = 40;
		
		MainGallery.windows = [];
		MainGallery.windows[0] = [1,2,3,4,5];
		MainGallery.windows[1] = [8,9,10];
		MainGallery.windows[2] = [6,7,8,9,10];
		MainGallery.windows[3] = [0,1,2,3];
		MainGallery.flipped = false;
		
		MainGallery.wid = -1;
		MainGallery.iid = 0;
		
		flip();
		main_timer = setInterval('MainGalleryAnimate()',3000);
   
	});
	
   MainGalleryClicksSetup();

}

function flip(){
  
  if(MainGallery.flipped==false){
	
	var wid = (MainGallery.wid + 1)==MainGallery.windows.length ? 0 : MainGallery.wid + 1
    var iid = Math.floor((Math.random() * MainGallery.windows[wid].length));
    MainGallery.wid = wid;
	MainGallery.iid = iid;
	
	//For scaling, find the leftmost el
	var l = 0 ;
	for(var i = 0 ; i < MainGallery.windows[wid].length;i++){
	  if(MainGallery.el[MainGallery.windows[wid][i]].position().left > MainGallery.el[MainGallery.windows[wid][l]].position().left){
	    l = i;
	  }	
	}
	var wt = MainGallery.el[MainGallery.windows[wid][l]].position().left - MainGallery.el[MainGallery.windows[wid][0]].position().left;
	wt = wt + MainGallery.el[MainGallery.windows[wid][l]].width(); 
    
	MainGallery.flipped = true;
	var w=0,h=0;
	var ox = MainGallery.el[MainGallery.windows[wid][0]].position().left;
	var oy = MainGallery.el[MainGallery.windows[wid][0]].position().top;
	for(var i = 0 ; i < MainGallery.windows[wid].length;i++){
	  var x = MainGallery.el[MainGallery.windows[wid][i]].position().left - ox;
	  var y = MainGallery.el[MainGallery.windows[wid][i]].position().top  - oy;
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-image', "url(" + '../../home/main/gallery/'+ MainGallery.galleries[MainGallery.windows[wid][iid]].pic + ")");
	  
	  var idx = MainGallery.windows[wid][i];	  		  
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-size','{0}px auto'.format([wt.toString()]));
	  MainGallery.slided[idx] = -x;
	  MainGallery.el[idx].css('background-position','{0}px {1}px'.format([-x.toString(),-y.toString()]));
	  
	  
	}
  }else{
    var wid,iid;
	wid = MainGallery.wid;
	iid = MainGallery.iid;
	MainGallery.flipped = false;
	for(var i = 0 ; i < MainGallery.windows[wid].length;i++){
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-image', "url(" + '../../home/main/gallery/'+ MainGallery.galleries[MainGallery.windows[wid][i]].pic + ")");
	  //MainGallery.el[MainGallery.windows[wid][i]].css('background-size','auto auto');
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-size','cover');
	  var x = 0;
	  
	  MainGallery.slided[MainGallery.windows[wid][i]] = x;
	  MainGallery.el[MainGallery.windows[wid][i]].css('background-position','{0}px 0px'.format([x.toString()]));
	}
  }
}

function MainGallery_hoverslide(el,l){

			if(l==1){ //hover out
			   for(var i = 0 ; i < MainGallery.el.length ; i++){
			      var x = MainGallery.slided[i];
				  MainGallery.el[i].stop().animate({'background-position-x': (x).toString() + 'px'}, 500 );
			   }
			   return;
			}
			
            var slided = false;
			var id = el.attr("id");
			  var idx = 0 ;
			  for(var i = 0 ; i < MainGallery.el.length ; i++){
				if(MainGallery.el[i].attr("id")==id){
				  idx = i ; break;
				}
			 }
			var wid = MainGallery.wid;
			if(MainGallery.flipped==true){			  
			  //See if among flipped windows			  
			  for(var i=0;i<MainGallery.windows[wid].length;i++){
			     if(idx==MainGallery.windows[wid][i]){
					slided = true;
				 }
			  }
			}
			  //Slide all in flipped state 
			  if((slided==true)){
				  for(var i=0;i<MainGallery.windows[wid].length;i++){
				    var x = MainGallery.slided[MainGallery.windows[wid][i]];
					x = x - MainGallery.slide_length;
					MainGallery.el[MainGallery.windows[wid][i]].stop().animate({'background-position-x': x.toString()+'px'}, 500 );					
				  }
			  }
			
			
			if((slided==false)){
			   var x = MainGallery.slided[idx];
			   x = x - MainGallery.slide_length;
			   MainGallery.el[idx].stop().animate({'background-position-x': (x).toString() + 'px'}, 500 );
			}
			
}

function MainGalleryClicksSetup(){
		console.log('Click Setup');
		$(".SMGImage").click( function(){	
			console.log('Click');
			var id = $(this).attr('gallery');
			console.log(id);
			
			if(MainGallery.flipped==true){
				//See if this belongs to the window that was flipped
				var wid,iid;
				wid = MainGallery.wid;
				iid = MainGallery.iid;
				var idx = id;
				//Search for actual Image
				for(var i=0;i<MainGallery.windows[wid].length;i++){
			     if(idx==MainGallery.windows[wid][i]){
					id = MainGallery.windows[wid][iid]
				 }
				}				
			}
			console.log( MainGallery.galleries[id].name)
			LoadGallery(MainGallery.galleries[id].name);
			vis = $("#GalleryView").css('visibility');
			if(vis=='hidden'){
			  $("#GalleryView").css({'top':$(window).scrollTop()});
			  $("#GalleryView").css('visibility','visible');
			}else{
			  $("#GalleryView").css('visibility','hidden');
			}
		});
		
		$('#GalleryView').click( function(){
			vis = $("#GalleryView").css('visibility');
			if(vis=='hidden'){
			  $("#GalleryView").css('visibility','visible');
			  
			}else{
			  $("#GalleryView").css('visibility','hidden');
			}
		});
/*	
		$(".SMGImage").hover(function () {
			$(".SMGImage").slideDown("slow");
		}, function(){
			$(".SMGImage").slideUp("slow");
		});


		
		$(".SMGImage").mouseenter( function(){	
		    MainGallery_hoverslide($(this),-1);
		});
		$(".SMGImage").mouseout( function(){	
			MainGallery_hoverslide($(this),1);
		});
*/
}