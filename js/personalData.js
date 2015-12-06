/**
 * Created by Administrator on 2015/11/15.
 */
$(function(){
    $.get('/users/getUsername',function(data){
        if(data.name == null){
            return;
        }else{
            $('.header_top_right ul').html("<li><a href='personalData.html'>"+ data.name +"</a></li>")
            document.cookie="username=" + data.name +"";
        }
    })
})

$('.main_left_menu li').click(function(){
    $('.main_left_menu li')
    var $i = $(this).index()
    $('.hide_data').each(function(){
        if($(this).index() == $i){
            $(this).addClass('show_data')
        }else{
            $(this).removeClass('show_data')
        }
    })
})



function Gid(e){
    return document.getElementById(e);
}
var showArea = function(){
    Gid('show').innerHTML = "<h3>省" + Gid('s_province').value + " - 市" +
        Gid('s_city').value + " - 县/区" +
        Gid('s_county').value + "</h3>"
}
Gid('s_county').setAttribute('onchange','showArea()');

