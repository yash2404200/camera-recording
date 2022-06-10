let video=document.querySelector("video");
let recordBtnCont= document.querySelector(".start");
let captureBtnCont = document.querySelector(".capture");
let recordBtn = document.querySelector(".a");
let captureBtn = document.querySelector(".b");

let recordFlag=false;
let recorder;
let chunks=[];
let constraints={
    video:true,
    audio:true
}
navigator.mediaDevices.getUserMedia(constraints)
    .then((stream)=>{
             video.srcObject=stream;

             recorder = new MediaRecorder(stream);
             recorder.addEventListener("start",(e)=>{
                 chunks=[];
             })
             recorder.addEventListener("dataavailable",(e)=>{
                 chunks.push(e.data);
             })
             recorder.addEventListener("stop",(e)=>{
                let blob= new Blob(chunks,{type:"video/mp4"});
                let videoURL =URL.createObjectURL(blob);
                let a =document.createElement("a");
                a.href =videoURL;
                a.download="stream.mp4";
                a.click();
             })
    })

    recordBtnCont.addEventListener("click",(e)=>{
        if(!recorder) return;
        recordFlag=!recordFlag;
        if(recordFlag){//start
           recorder.start();
           recordBtn.classList.add("scale-record");
        }else{//stop
           recorder.stop();
           recordBtn.classList.remove("scale-record");
        }
    })
