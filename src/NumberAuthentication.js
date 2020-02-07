window.onload=function () {
  render();
};
function render() {
    window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}
function phoneAuth() {
    //get the number
    var number=document.getElementById('number').value;
    //phone number authentication function of firebase
    //it takes two parameter first one is number,,,second one is recaptcha
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        console.log(coderesult);
        alert("Message sent");
    }).catch(function (error) {
        alert(error.message);
    });
}
function redirect(){
    window.location="./index_old.html";
}
function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}


function codeverify() {
    var code=document.getElementById('verificationCode').value;
    coderesult.confirm(code).then(function (result) {
        alert("Successfully Logged in");

        return firebase.database().ref('users').once('value').then(function(snapshot) {
                    if(snapshot.exists()){
                        snapshot.forEach(function(userSnapshot) {
                           var json_data=userSnapshot.val();
                           var x = json2array(json_data);
                           //alert(x[3]);
                           var key = x[3] + "";
                           alert(key);
                           //localStorage.setItem("storageName",key);
                           //redirect.call();
                        });
                    }
        });
       
        
        }).catch(function (error) {
        alert(error.message);
    });
}

    
