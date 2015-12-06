/**
 * Created by Administrator on 15-10-23.
 */
//原生JS；
var flag = 0;
var flag1 = 0
var arr = ['css/庄心妍 - 爱情遗嘱.mp3','css/郑智化 - 水手.mp3','css/许嵩 - 对话老师.mp3','css/zaijian.mp3','SOD蜜 - 爱囚.mp3']
$('.btn').click(function(){
    var btn = $(this)[0];
    var vidio = ($(this).prev())[0];
    flag = (flag ) ? 0 : 1;
    if(flag==true){
        btn.title="暂停";
        vidio.play();
    } else {
        btn.title="播放";
        vidio.pause();
    }
})

$('.playAudios').click(function(){
    $('audio').remove();
    $(this).parent().append("<audio src='"+ arr[$('.playAudios').index($(this))] +"'></audio>")
    $(this).parent().find('audio')[0].play();
})

$('.pauseAudios').click(function(){
    $(this).parent().find('audio')[0].pause()
})