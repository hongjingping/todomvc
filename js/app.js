(function (angular) {
	'use strict';
	/*主模块*/
	var myApp = angular.module("myTodoMvc",[]);
	/*注册一个主要的控制器*/
	myApp.controller("MainController",["$scope",function($scope){
		/*取得ID，一样的话就重新取*/
		function getId(){
			var id = Math.random();
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === id){
					id = getId();
					break;
				}
			}
			return id;
		}

		/*文本框需要一个模型*/
		$scope.text = "";
		/*任务也需要一个模型*/
		$scope.todos = [
			{id:1,text:"学习",complete:true},
			{id:2,text:"吃饭",complete:false},
			{id:3,text:"睡觉",complete:false}
		];
		/*1.添加todo*/
		$scope.add = function(){
			if(!$scope.text){
				return;
			}
			$scope.todos.push({
				id:getId(),
				/*$默认是双向数据绑定的，add同时肯定可以通过它拿到*/
				text:$scope.text,
				completed:true
			});
			/*情况模型数据，由模型情况文本框*/
			$scope.text = "";
		};

		/*2.删除*/
		$scope.remove = function(id){
			/*删除谁，根据id对应的元素删除即可，splice*/
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === id){
					$scope.todos.splice(i,1);
					break;
				}
			}
		};

		/*3.清空*/
		$scope.clear = function(){
			var res= [];
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed){
					/*$scope.todos.splice(i,1);一旦删除了一项，id就变化了*/
					res.push($scope.todos[i]);
				}
			}
			$scope.todos = res;
		};

		/*4.是否有已经完成的*/
		$scope.existCompleted = function(){
			/*该函数一定要有返回值*/
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		};

		/*5.当前编辑的元素*/
		$scope.currentEditingId = -1;/*默认不存在*/
		$scope.editing = function(id){
			$scope.currentEditingId = id;
		};
		/*停止编辑*/
		$scope.save = function(id){
			$scope.currentEditingId = -1;
		};

		/**/
		/*$scope.checkall = false;
		 $scope.$watch("checkall",function(now,old){
		 for(var i=0;i<$scope.length;i++){
		 $scope.todos[i].completed = now;
		 }
		 })*/

		/*6.全选*/
		var now = true;
		$scope.toggleAll = function(){
			for(var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed = now;
			}
			now = !now;
		}
	}])

})(angular);
