/**
 * Created by Administrator on 15-11-18.
 */

$(function(){
    $.get('/users/getUsername',function(data){
        if(data.name == null){
            return;
        }else{
            $('.header_top_right ul').html("<li><a href='personalData.html'>"+ data.name +"</a></li>")
            document.cookie="username=" + data.name +"";
            $.post('/users/queryReply',{replyID:localStorage.replyID},function(data){
                for(var i = 0; i < data.length; i++){
                    $('.main_top').append("<div class='reply_box'>" +
                        "<div class='reply_box_left'><img src='"+ data[i].userPictrue +"' alt='求真相'/><span>"+ data[0].username +"</span></div>" +
                        "<div class='reply_box_right'><p>"+ data[0].replyContent +"</p><span>"+ data[0].replyTime +"</span></div><div class='clear'></div>" +
                        "</div>")
                }
            })
        }
    })

    var data = localStorage.pageDetailed;
    $('.main_top').append(data);
    $('.collection_button').bind('click',function(){
        var img = $(this).parent().parent().parent().find('h2');
        var flyElm = img.clone().css('opacity', 0.75);
        $('body').append(flyElm);
        flyElm.css({
            'z-index': 9000,
            'display': 'block',
            'position': 'absolute',
            'top': img.offset().top +'px',
            'left': img.offset().left +'px',
            'width': img.width() +'px',
            'height': img.height() +'px',
            'color':'#ddd'
        });
        flyElm.animate({
            top: $('.header_top_right ul li a').offset().top,
            left: $('.header_top_right ul li a').offset().left,
            width: 20,
            height: 32
        }, 'slow', function() {
            flyElm.remove();
        });
    });

})

function getDate(){
    var newtime = new Date();
    var year = newtime.getFullYear()
    var month = parseInt(newtime.getMonth())+1;
    var day = newtime.getDate();
    var when = newtime.getHours()
    var points = newtime.getMinutes()
    var seconds = newtime.getSeconds()
    var time520 = year+"-"+month+"-"+day+" "+when+":"+points+":"+seconds;
    return time520;
}

function reply_post(e){
    $.get('/users/getUsername',function(data){
        if(data.name == null){
            alert('请登录!')
        }else{
            localStorage.replyName = data.name
            $('.main_bottom').css({'display':'block'})
            localStorage.replyID = e;
        }
    })
}

$('.log_input_box_button button').click(function(){
    var PostNumber = localStorage.replyID;
    var replyTime = getDate();
    var replyContent = getContent();
    if(replyContent == null && PostNumber ==null){
        return;
    }else{
        $.post('/users/addReply',{PostNumber:PostNumber,replyTime:replyTime,replyContent:replyContent},function(data){
            $('.main_bottom').css({'display':'none'})
            if(data.affectedRows == 1){
                $.post('/users/queryReply',{replyID:localStorage.replyID},function(data){
                    for(var i = 0; i < data.length; i++){
                        $('.main_top').append("<div class='reply_box'>" +
                            "<div class='reply_box_left'><img src='"+ data[i].userPictrue +"' alt='求真相'/><span>"+ data[0].username +"</span></div>" +
                            "<div class='reply_box_right'><p>"+ data[0].replyContent +"</p><span>"+ data[0].replyTime +"</span></div><div class='clear'></div>" +
                            "</div>")
                    }
                })
            }
        })
    }
})