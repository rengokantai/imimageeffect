/**
 * Created by Hernan Y.Ke on 2015/4/26.
 */

// Switch between front or back photos
function turn (elem){
    var cls =elem.className;
    if(/photo_front/.test(cls)){
        cls=cls.replace(/photo_front/,'photo_back');
    }else{
        cls.replace(/photo_back/,'photo_front')
    }
    return cls.className;
}

//Get id or class element
function g(elem){
    var  method =elem.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
    return document[method](elem.substr(1));
}

var data=data;
function addPhotos(){
    var template =g('#wrap').innerHTML;
    var html=[];
    var nav=[];


    for(s in data){
        var _html =template.replace('{{index}}',s).replace('{{img}}',data[s]).replace('{{caption}}',data[s].caption).replace('{{desc}}',data[s].desc);
        html.push(_html);
    }

    nav.push('<span id="nav+s+'+s+'" onclick="turn()" class="i"></span>');

    g('#wrap').innerHTML=html.join('');
    rsort(random([0,data.length]));

}

addPhotos();

//sort posts

function rsort(n){
    var _photo =g('.photo');
    var photos =[];

    for(s=0;s<_photo.length;s++){
        _photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/,'');
    }

    var photo_center = g('#photo_'+n);
    photo_center.className += ' Photo_center ';
    photo_center =photos.splice(n,1)[0];
    var photos_left = photos.splice(0,Math.ceil(photos.length/2));
    var photos_left = photos;

    var ranges =range();

    for(s in photos_left){
        var photo =photos_left[s];
        photo.style.left=random(ranges.left.x)+'px';
        photo.style.top=random(ranges.left.y)+'px';
        photo.style['-webkit-transform']='rotate('+random([-150,150])+'deg)';

    }

    for(s in photos_right){
        var photo =photos_right[s];
        photo.style.left=random(ranges.left.x)+'px';
        photo.style.top=random(ranges.left.y)+'px';
        photo.style['-webkit-transform']='rotate('+random([-150,150])+'deg)';

    }


}




function range(){
    var range={ left:{x:[],y:[]},right:{x:[],y:[]}};
    var wrap={
        w:g('#wrap').clientWidth,
        h:g('#wrap').clientHeight
    }

    var photo={
        w:g('.photo')[0].clientWidth,
        h:g('.photo')[0].clientHeight
    }


    range.wrap=wrap;
    range.photo=photo;

    range.left.x=[0-photo.w, wrap.w/2-photo.w/2];
    range.left.y=[0-photo.h,wrap.h];

    range.right.x=[wrap.w/2+photo.w/2, wrap.w +photo.w];
    range.right.y=range.left.y;

    return range;


}


function getRandom(range){
    var max =Math.max(range[0],range[1]);
    var min =Math.min(range[0],range[1]);

    var diff= max-min;

    var number = Math.ceil((Math.random()*diff+min));

    return number;

}

