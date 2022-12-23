prediction1="";

Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
})
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_url+'"/>';

    });

}

console.log("ml5 version:",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QJATDPpOW/model.json',modelloaded);

function modelloaded(){
    console.log("model loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The prediction is "+prediction1;

    var utterThis=new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);

}

function gotResult(error,results){
   if(error){
    console.error(error);
   }
   else{
    console.log(results);

    document.getElementById("prediction").innerHTML=results[0].label;
    prediction1=results[0].label;
    speak();

    if(results[0].label=="bad"){
        document.getElementById("gesture_id").innerHTML="&#128078;";
    }
   if(results[0].label=="nice"){
        document.getElementById("gesture_id").innerHTML="&#128076;";
    }
    if(results[0].label=="good"){
        document.getElementById("gesture_id").innerHTML="&#128077;";
    }

   }
}