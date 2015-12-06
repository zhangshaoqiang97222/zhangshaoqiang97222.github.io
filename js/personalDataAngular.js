/**
 * Created by Administrator on 2015/11/16.
 */
var app = angular.module('myApp',[]);
app.controller('myCon',['$scope','$http',function($scope,$http){
    $scope.test = true;
    $scope.test1 = true;
    $scope.flag = true;
    $scope.alterData = function(){
        if($scope.flag){
            $scope.test = false;
            $scope.test1 = false;
            $scope.flag = false;
        }else{
            $scope.test = true;
            $scope.test1 = true;
            $scope.flag = true;
        }
    }

    $scope.saveData = function(){
        $http({
            method:'get',
            url:"/users/getUsername"
        }).success(function(data){
            if(data.name != null){
                $http({
                    method:'post',
                    url:'/users/updataData',
                    data:{
                        sex:$scope.sex,
                        age:$scope.age,
                        birthday:$scope.birthday,
                        constellation:$scope.constellation,
                        site:$scope.site,
                        maritalStatus:$scope.maritalStatus,
                        country:$scope.country,
                        province:$scope.province,
                        city:$scope.city,
                        job:$scope.job,
                        id:localStorage.userId
                    }
                }).success(function(data){
                    if(data.affectedRows){
                        $scope.test = true;
                        $scope.test1 = true;
                        $scope.flag = true;
                        $scope.selectPersonalData();
                    }
                })
            }else{
                alert('请登录')
            }
        })
    }

    $scope.selectPersonalData = function(){
        var userId = localStorage.userId;
        if(userId != null){
            $http({
                method:'get',
                url:"/users/selectPersonalData",
                params:{userId:userId}
            }).success(function(data){
                $scope.data=data;
                $scope.buttonEle = true;
            })
        }else{
            $scope.buttonEle = false;
        }
    }
    $scope.selectPersonalData();


    $scope.selectMyPost = function(){
        var userId = localStorage.userId;
        if(userId != null){
            $http({
                method:'get',
                url:"/users/selectMyPost",
                params:{userId:userId}
            }).success(function(data){
                $scope.myPost=data;
            })
        }
    }

    $scope.pageDetailed = function(){
        var postId = $scope.myPost[this.$index].id;
        $http({
            method:'get',
            url:"/users/pageDetailed",
            params:{id:postId}
        }).success(function(data){
            localStorage.pageDetailed=""+ data +"";
            window.location.href = 'pageDetailed.html';
        })
    }
}])