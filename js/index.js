/**
 * Created by Administrator on 15-11-12.
 */

var flag22 = true;
$(function(){
    $.get('/users/getPost',function(data){
        for(var j = 0; j <data; j++){
            $('.page_button').append("<button pageNo='"+ j +"' onclick='searchPage("+ j +")'>"+ (j+1) +"</button>")
        }
        var aa = $('.page_button button:nth-child(1)').attr('pageNO');
        getPostContent(aa)
    })

    $.get('/users/getUsername',function(data){
        if(data.name == null){
            return;
        }else{
            $('.header_top_right ul').html("<li><a href='personalData.html'>"+ data.name +"</a></li>")
            document.cookie="username=" + data.name +"";
        }
    })
})

function getPostContent(aa){
    $('.replies_box').remove();
    $('.page_button button').css({'backgroundColor':'#fff','color':'#000'});
    $(".page_button button[pageNo='"+ aa +"']").css({'backgroundColor':'red','color':'#fff'});
    $.get('/users/loadingpostDetailed',{pageNo:aa},function(data){
        for(var i = 0; i < data.length; i++){
            $('.post_content').append("<div class='replies_box'>" +
                "<span class='replies'>"+ data[i].id +"</span>"+
                "<div class='post_news'>"+
                "<div class='post_news_left'>"+
                "<a href='javascript:pageDetailed("+ data[i].id +","+ data[i].postID +")'>"+ data[i].PostMenu  +"</a>"+
                "</div>"+
                "<div class='post_news_right'>"+
                "<img src='"+ data[i].userPictrue +"' class='account_picture' alt='求真相'/>"+
                "<span class='username'>"+ data[i].username +"</span>"+
                "</div>"+
                "</div>"+
                "<div class='user_news'>"+
                "<div class='user_news_left'>"+
                "<span>"+ data[i].PostDescribe +"</span>"+
                "</div>"+
                "<div class='user_news_right'>"+
                "</div>"+
                "</div>"+
                "</div>")
        }
    })
}

function searchPage(aa){
    getPostContent(aa);
}


$('.input_box span').click(function(){
    $.post('/users/search',{searchType:$('.search_type').val(),data1:$('.input_box input').val()},function(data){
        $('.replies_box').remove();
        for(var i = 0; i < data.length; i++){
            $('.post_content').append("<div class='replies_box'>" +
                "<span class='replies'>"+ data[i].id +"</span>"+
                "<div class='post_news'>"+
                "<div class='post_news_left'>"+
                "<a href='javascript:pageDetailed("+ data[i].id +","+ data[i].postID +")'>"+ data[i].PostMenu  +"</a>"+
                "</div>"+
                "<div class='post_news_right'>"+
                "<img src='"+ data[i].userPictrue +"' class='account_picture' alt='求真相'/>"+
                "<span class='username'>"+ data[i].username +"</span>"+
                "</div>"+
                "</div>"+
                "<div class='user_news'>"+
                "<div class='user_news_left'>"+
                "<span>"+ data[i].PostDescribe +"</span>"+
                "</div>"+
                "<div class='user_news_right'>"+
                "</div>"+
                "</div>"+
                "</div>")
        }
    })
})

$('.publishedNewPost').click(function(){
    $.get('/users/getUsername',function(data){
        if(data.name == null){
            $('.login_barrier').css({'display':'block'})
        }else{
            $('.published_post').css({'display':'block'})
        }
    })
})

$('.close_window').click(function(){
    $('.login_barrier').css({'display':'none'})
})

//鑾峰彇褰撳墠鏃堕棿
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

//鑾峰彇鐢ㄦ埛鍚�
function getCookie(){
    var cookies = document.cookie;
    var cc = new String();
    var aa = cookies.split('=')[1];
    return aa;
}

$('.published_button_box button').click(function(){
    var $postMenu = $('.published_post_menu input:nth-child(1)').val();
    var $postDescribe = $('.published_post_menu input:nth-child(2)').val();
    var $postContent = getContent();
    var time110 = getDate()
    var cookie1 = getCookie();
    var userid = localStorage.userId;
    if(flag22){
        flag22 = false;
        if($postMenu != '' && $postDescribe != '' && $postContent != '' && cookie1!='' && userid != null){
            $.post('/users/addPost',{PostTime:time110,PostContent:$postContent,PostDescribe:$postDescribe,PostMenu:$postMenu,PostAuthor:cookie1,userid:userid},function(data){
                if(data.affectedRows == 1){
                    alert('帖子增加成功')
                    window.location.href = 'index.html'
                }else{
                    alert('帖子添加失败')
                }
            })
        }
        flag22 = true;
    }
})


function pageDetailed(e,a){
    var id = e;
    var postID=a;
    localStorage.PostNumber=id
    $.get('/users/pageDetailed',{id:id,postID:postID},function(data){
        localStorage.pageDetailed=""+ data +"";
        window.location.href = 'pageDetailed.html';
    })
}