/**
 * Created by Administrator on 2015/11/11.
 */

$(function(){
    getCode()
})
//验证码函数
function getCode(){
    $.get('/users/getVerificationCode',function(data){
        $('.verification_code_box').html(data.verificationCodeStore);
    })
}


//验证表单
//用户名获得焦点时
$('.username_box input').focus(function(){
    $('.username_box').css({"border":"1px solid #A79470","boxShow":"0px 0px 2px #A78959"})
    $('.nameMessage').css({"display":"block"})
})

//用户名失去焦点时
$('.username_box input').blur(function(){
    $('.username_box').css({"border":"1px solid #ccc","boxShow":""})
    $('.nameMessage').css({"display":"none"})
    examinename();
})
//密码框获得焦点时
$('.pwd_box input').focus(function(){
    $('.pwdMessage').css({"display":"block"})
    $('.pwd_box').css({"border":"1px solid #A79470","boxShow":"0px 0px 2px #A78959"})
})
//密码框失去焦点时
$('.pwd_box input').blur(function(){
    $('.pwd_box').css({"border":"1px solid #ccc","boxShow":""})
    $('.pwdMessage').css({"display":"none"})
    examinepwd();
})

//验证码框获得焦点时
$('.verification_code input').focus(function(){
    $('.verification_code_error').css({"display":"block"})
    $('.verification_code input').css({"border":"1px solid #A79470","boxShow":"0px 0px 2px #A78959"})
})
//验证码框失去焦点时
$('.verification_code input').blur(function(){
    $('.verification_code input').css({"border":"1px solid #ccc","boxShow":""})
    $('.verification_code_error').css({"display":"none"})
    examineCode();
})

//验证用户名格式
function examinename(){
    if($(".username_box input").val().length == 0){
        $('.nameMessage').css({"display":"block"}).html("账户名不能为空");
        return false;
    }
    if(!(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/).test($(".username_box input").val())){
        $('.nameMessage').css({"display":"block"}).html("账户名格式不对");
        return false;
    }
    $('.nameMessage').css({"display":"block"}).html("用户名可以使用");
    return true;
}

//验证密码格式
function examinepwd(){
    if($(".pwd_box input").val().length == 0){
        $('.pwdMessage').css({"display":"block"}).html("密码不能为空");
        return false;
    }
    if(!(/^[a-zA-Z]\w{5,17}$/).test($(".pwd_box input").val())){
        $('.pwdMessage').css({"display":"block"}).html("密码格式不对");
        return false;
    }
    $('.pwdMessage').css({"display":"block"}).html("密码可以使用");
    return true;
}

function examineCode(){
    if($('.verification_code_box').html().toUpperCase() == $('.verification_code input').val().toUpperCase()){
        $('.verification_code_error').css({"display":"block"}).html('验证码正确！')
        return true;
    }else{
        $('.verification_code_error').css({"display":"block"}).html('验证码错误！')
        return false;
    }
}

function formSubmit(){
    if(examinepwd() && examinename() && examineCode()){
        $('.pwdMessage').css({"display":"none"})
        $('.nameMessage').css({"display":"none"})
        $('.verification_code_error').css({"display":"none"})
        $.post('/users/loginUser',{
            'name':$(".username_box input").val(),
            'pwd':$(".pwd_box input").val()
        },function(data){
            if(data.affectedRows == 0){
                $('.pwdMessage').html('用户名或密码错误!')
                $('.pwdMessage').css({'display':'block'})
            }else{
                $.post('/users/selectId',{
                    'name':$(".username_box input").val(),
                    'pwd':$(".pwd_box input").val()
                },function(data){
                    $('.myForm_box').css({
                        'position':'absolute',
                        'z-index':'9999',
                        'top':"20px",
                        'left':'50%',
                        'top':'50%',
                        'transfrom':'translateX(-50%) translateY(-50%)',
                        'opacity':'1'
                    })
                    localStorage.userId = ""+ data[0].id +""
                    $('.myForm_box').animate({
                        'left':$('body').offset().left,
                        'top':$('body').offset().top,
                        'opacity':'0'
                    },1000,'linear',function(){
                        $('.myForm_box').remove();
                    })
                    setTimeout(cc,3000)
                    function cc(){
                        window.location.href = 'index.html'
                    }
                })
            }
        })
    }else{
        return false;
    }
}