/**
 * Created by Administrator on 2015/11/21.
 */
var classEle = null;
$('.userPortrait').click(function(){
    $('.userPortrait').css({'border':'2px solid #22CC5E'})
    $(this).css({'border':'2px solid #CC6D0E'})
    classEle = $(this).attr('src');
})

$('.portrait_button button').click(function(){
    if(classEle == null){
        return;
    }else{
        $.post('/users/addPersonaldata',{
            'id':localStorage.id
        },function(data){
            $.post('/users/selectPortrait',{userPictrue:classEle,id:localStorage.id},function(data){
                if(data.affectedRows){
                    window.location.href = "login.html"
                }else{
                    alert('未知错误')
                }
            })
        })
    }
})