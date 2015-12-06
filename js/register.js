/**
 * Created by Administrator on 15-11-11.
 */

//文档加载完毕获取验证码

var flag = false;
var flag1 = false;
$(function(){
    getCode()
})
//验证码函数
function getCode(){
    $.get('/users/getVerificationCode',function(data){
        $('.verification_code_box').html(data.verificationCodeStore);
    })
}
//用户名框获得焦点
$('.username_box input').focus(function(){
    $('.username_box').css({"border":"1px solid #A79470","boxShow":"0px 0px 2px #A78959"})
    $('.nameMessage').css({"display":"block"})
})

//用户名框失去焦点
$('.username_box input').blur(function(){
    $('.username_box').css({"border":"1px solid #ccc","boxShow":""})
    $('.nameMessage').css({"display":"none"})
    if(examinename()){
        $.post('/users/selectUsername',{username:$(this).val()},function(data){
            if(!data.affectedRows){
                flag1 = true;
                $('.nameMessage').css({"display":"block"}).html("用户名可以使用!");
            }else{
                flag1 = false;
                $('.nameMessage').css({"display":"block"}).html("该用户名已存在!");
            }
        })
    }
})

//密码框获得焦点
$('.pwd_box input').focus(function(){
    $('.pwdMessage').css({"display":"block"})
    $('.pwd_box').css({"border":"1px solid #A79470","boxShow":"0px 0px 2px #A78959"})
})
//密码框失去焦点
$('.pwd_box input').blur(function(){
    $('.pwd_box').css({"border":"1px solid #ccc","boxShow":""})
    $('.pwdMessage').css({"display":"none"})
    examinepwd();
})

//邮箱框获得焦点
$('.email_box input').focus(function(){
    $('.emailMessage').css({"display":"block"})
    $('.email_box').css({"border":"1px solid #A79470","boxShow":"0px 0px 2px #A78959"})
})
//邮箱框失去焦点
$('.email_box input').blur(function(){
    $('.email_box').css({"border":"1px solid #ccc","boxShow":""})
    $('.emailMessage').css({"display":"none"})
    if(examineEmail()){
        $.post('/users/selectEmail',{email:$(this).val()},function(data){
            if(!data.affectedRows){
                flag = true;
                $('.emailMessage').css({"display":"block"}).html("邮箱可以使用!");
            }else{
                flag = false;
                $('.emailMessage').css({"display":"block"}).html("该邮箱已被人注册!");
            }
        })
    }
})

//验证吗框获得焦点

$('.verification_code input').focus(function(){
    $('.verification_code_error').css({"display":"block"})
    $('.verification_code input').css({"border":"1px solid #A79470","boxShow":"0px 0px 2px #A78959"})
})

//验证码框失去焦点
$('.verification_code input').blur(function(){
    $('.verification_code input').css({"border":"1px solid #ccc","boxShow":""})
    $('.verification_code_error').css({"display":"none"})
    examineCode();
})

//检查用户名格式函数
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
//检查密码格式函数
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
//检查邮箱格式函数
function examineEmail(){
    if($(".email_box input").val().length == 0){
        $('.emailMessage').css({"display":"block"}).html("邮箱不能为空");
        return false;
    }
    if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test($(".email_box input").val())){
        $('.emailMessage').css({"display":"block"}).html("邮箱格式不对");
        return false;
    }
    $('.emailMessage').css({"display":"block"}).html("邮箱可以使用");
    return true;
}
//检查验证码是否正确
function examineCode(){
    if($('.verification_code_box').html().toUpperCase() == $('.verification_code input').val().toUpperCase()){
        $('.verification_code_error').css({"display":"block"}).html('验证码正确！')
        return true;
    }else{
        $('.verification_code_error').css({"display":"block"}).html('验证码错误！')
        return false;
    }
}
//表单提交函数
function formSubmit(){
    if(examinepwd() && examinename() && examineEmail() && examineCode() && flag==true && flag1==true){
        $('.myForm_box').css({
            'position':'absolute',
            'z-index':'9999',
            'top':"20px",
            'left':'50%',
            'transfrom':'translateX(-50%)',
            'opacity':'1'
        })
        $('.emailMessage').css({"display":"none"})
        $('.pwdMessage').css({"display":"none"})
        $('.nameMessage').css({"display":"none"})
        $('.verification_code_error').css({"display":"none"})
        $.post('/users/addUser',{
            'name':$(".username_box input").val(),
            'pwd':$(".pwd_box input").val(),
            'email':$(".email_box input").val()
        },function(data){
            $('.myForm_box').animate({
                'left':$('body').offset().left,
                'top':$('body').offset().top,
                'opacity':'0'
            },1000,'linear')
            setTimeout(cc,3000)
            function cc(){
                $.post('/users/selectId',{
                    'name':$(".username_box input").val(),
                    'pwd':$(".pwd_box input").val()
                },function(data){
                    localStorage.id=data[0].id;
                    $('.myForm_box').remove();

                })
            }
        })
    }else{
        return false;
    }
}

