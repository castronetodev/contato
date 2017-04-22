app.controller('userCtrl', function($scope, $firebaseAuth, $http) {
    $scope.auth = $firebaseAuth();
    $scope.userdata = JSON.parse(window.localStorage.getItem('data'));

 
   
      

    $scope.facebookAuth = function(){
    
    $scope.auth.$signInWithPopup("facebook").then(function(firebaseUser) {
      
        
        window.localStorage.setItem('data', JSON.stringify(firebaseUser.user));
        $scope.userdata = JSON.parse(window.localStorage.getItem('data'));
    }).catch(function(error) {
        console.log("Authentication failed:", error);
    });
   }

    $scope.googleAuth = function(){
    $scope.auth.$signInWithPopup("google").then(function(firebaseUser) {
        window.localStorage.setItem('data', JSON.stringify(firebaseUser.user));
        $scope.userdata = JSON.parse(window.localStorage.getItem('data'));
       
    }).catch(function(error) {
        console.log("Authentication failed:", error);
    });
   }

   $scope.LoginSocialAccount = function(cpf1){
        
        var data = {
            imguser: $scope.userdata.photoURL,
            nome: $scope.userdata.displayName,
            email: $scope.userdata.email,
            cpf: cpf1
        }
        $http.post("https://precinhofitness-93726.firebaseio.com/rest/saving-data/users.json", data).then(function(response) {
        alert("enviou");
     }, function(response){
        alert("error");
     });
   }

   $scope.login = function(useremail, passworsd){
    var user = {
           email: useremail,
           password: passworsd
    }
    $http.post("http://127.0.0.1:8000/api/login", user).then(function(response) {
        
        $scope.callback = response.data.token;
        
     }, function(response){
        $scope.faillogin = true;
        
     });
   }

});