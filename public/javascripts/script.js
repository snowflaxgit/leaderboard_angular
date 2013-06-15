// JavaScript Document
var myApp = angular.module('myApp', []);
var socket = io.connect(); // socket connection 	

function LeaderBoardCtrl($scope, $http) {		
	
  $http({method: 'GET', url: '/list'}).
  success(function(data, status, headers, config) {
    $scope.users = data;
	//console.log(data);
	$.chartBar($scope.users);	
  }).
  error(function(data, status, headers, config) {
	  console.log("err : "+data);
  });  
 	
  $scope.rating = function(id){
	  //console.log("id: "+id);
	  //$(this).attr("id");
	   socket.emit('id', { user_id : id });
	    // get updated item data from socket   	      		
    }	 
	
  socket.on('update', function (data) {
		//var items = data.items;
//		console.log(data);
//		$scope.users = data.items;	
		
		 $http({method: 'GET', url: '/list'}).
		  success(function(data, status, headers, config) {
			$scope.users = data;
			//console.log(data);
	  		$.chartBar($scope.users);	
		  }).
		  error(function(data, status, headers, config) {
			  console.log("err : "+data);
		  }); 
			 
	}); 	
  	
	$scope.total = function(){
		var total=0;
		angular.forEach($scope.users, function(item){
			total+=item.rate;
        });
        return total;
	};	
	
	$scope.highest = function(){
		var max=0;
		var high = [];
		angular.forEach($scope.users, function(item){
			high.push(item.rate);
        });
		max = Math.max.apply(Math,high);
        return max;
	};	
	
}

$(document).ready(function(e) {	
	
	$.chartBar = function (data){
	
		var name = [];	
		var rate = [];	
		//var min =0,steps,max=0;
		
		if(data){
			$.each(data, function (index, item) {
				name.push(item.name);
				rate.push(item.rate);
				//console.log(rate,name)
			});
		}
		else{
			//console.log("data is null");	
		}
			//console.log(name,rate);
		
		//min = Math.min.apply(Math,rate);
		//max = Math.max.apply(Math,rate);
		//steps = ((max-min)/5)+1;
		
		var barChartData = {
			labels : name,
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					data : rate
				}
			]		
			
		}		
		var option = {
			animation : false,
			//scaleShowLabels : true,
//			scaleOverride : true,
//			scaleSteps : steps,
//			scaleStepWidth : 5,
//			scaleStartValue : min
		}
		//Get context with jQuery - using jQuery's .get() method.
		var ctx = $("#myChart").get(0).getContext("2d");
		//This will get the first returned node in the jQuery collection.
		var myNewChart = new Chart(ctx).Bar(barChartData, option);
	};
	
						
});
