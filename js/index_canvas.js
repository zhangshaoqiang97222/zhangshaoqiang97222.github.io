/**
 * Created by Administrator on 2015/11/12.
 */

$( function(){
    setTimeout(function(){
        var canvas1=document.getElementById("myCanvas");
        var ctx=canvas1.getContext("2d")
        ctx.font="20px Verdana";
        var gradient=ctx.createLinearGradient(0,0,180,0);
        gradient.addColorStop("0","#43DE42");
        gradient.addColorStop("0.2","#DEBE25");
        gradient.addColorStop("0.4","#DE2326");
        gradient.addColorStop("0.6","#DE18C8");
        gradient.addColorStop("0.8","#1139DE");
        gradient.addColorStop("1.0","#14DED4");

        ctx.fillStyle=gradient;
        ctx.fillText("亲爱的游客，欢迎你访问班级网。",0,30);
    },5000)
});

var flag = 0;
function control() {
    var videoEle = document.getElementsByTagName("audio")[0];
    var btnEle = document.getElementById("btn");
    flag = (flag ) ? 0 : 1;
    if(flag==true){
        btnEle.innerHTML="暂停";
        btnEle.style.backgroundColor="rgba(0,0,0,.4)";
        videoEle.play();
    } else {
        btnEle.innerHTML="播放";
        btnEle.style.backgroundColor="rgba(0,0,0,.2)";
        videoEle.pause();
    }
}

var canvas,context;
function draw(){
    ///得到当前系统时间的：时、分、秒
    var now_date=new Date();
    var radius = Math.min(canvas.width/2,canvas.height/2),
        sec=now_date.getSeconds(),
        min=now_date.getMinutes(),
        hour=now_date.getHours();
    hour=hour>=12?hour-12:hour;

    //初始化画布
    context.save();
    context.clearRect(0,0,canvas.width,canvas.height);
    context.translate(canvas.width/2,canvas.height/2);
    context.scale(0.9,0.9);
    context.rotate(-Math.PI/2);
    context.save();

    //小时刻度
    context.strokeStyle="black";
    context.fillStyle="black";
    context.lineWidth=3;
    context.lineCap="round";
    context.beginPath();
    for(var i=0;i<12;i++){
        context.rotate(Math.PI/6);
        context.moveTo(radius-30,0);
        context.lineTo(radius-10,0);
    }
    context.stroke();
    context.restore();
    context.save();

    //分钟刻度
    context.lineWidth=2;
    context.beginPath();
    for(var i=0;i<60;i++){
        if(i%5!=0){
            context.moveTo(radius-15,0);
            context.lineTo(radius-10,0);
        }
        context.rotate(Math.PI/30);
    }
    context.stroke();
    context.restore();
    context.save();

    //画上时针
    context.rotate((Math.PI/6)*hour+(Math.PI/360)*min+(Math.PI/21600)*sec);
    context.lineWidth=6;
    context.lineCap="butt";
    context.beginPath();
    context.moveTo(-10,0);
    context.lineTo(radius*0.5,0);
    context.stroke();
    context.restore();
    context.save();

    //分针
    context.rotate((Math.PI/30)*min+(Math.PI/1800)*sec);
    context.strokeStyle="#29A8DE";
    context.lineWidth=4;
    context.lineCap="butt";
    context.beginPath();
    context.moveTo(-20,0);
    context.lineTo(radius*0.7,0);
    context.stroke();
    context.restore();
    context.save();

    //秒针
    context.rotate(sec*Math.PI/30);
    context.strokeStyle="red";
    context.lineWidth=2;
    context.lineCap="butt";
    context.beginPath();
    context.moveTo(-30,0);
    context.lineTo(radius*0.9,0);
    context.stroke();
    context.restore();
    context.save();

    ///表框
    context.lineWidth=4;
    context.strokeStyle="gray";
    context.beginPath();
    context.arc(0,0,radius,0,Math.PI*2,true);
    context.stroke();
    context.restore();
    context.restore();
}