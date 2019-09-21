// var getUserMedia = require('getusermedia')

// getUserMedia({ video: true, audio: false }, function (err, stream) {
//   if (err) return console.error(err)

//   var SimplePeer = require('simple-peer')

document.addEventListener("DOMContentLoaded",()=>{

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(function(stream) {
            let p = new SimplePeer({
                initiator: window.location.hash === '#1',
                trickle: false,
                stream: stream
            });

            p.on('error', err => console.log('error', err))
 
            p.on('signal', data => {
              console.log('SIGNAL', JSON.stringify(data))
              document.querySelector('#outgoing').textContent = JSON.stringify(data)
            });

            document.querySelector('#connect').addEventListener('submit', (ev) => {
              ev.preventDefault();
              p.signal(JSON.parse(document.querySelector('#incoming').value))
            });
        
            p.on('connect', () => {
                console.log('CONNECT')
                document.querySelector("#send").addEventListener('submit' ,(ev)=>{
                    ev.preventDefault();
                    let data = document.getElementById("Message").value;
                p.send('whatever' + data);
              });
            });
        
            p.on('data', data => {
              console.log('data: ' + data)
            });


            p.on('stream', function (stream) {
                console.log("streaming");
                var video = document.querySelector('video');
                video.srcObject = stream;
                video.play();
            });  
        })
        .catch(function(err) {
            console.log(err);
        });
});
