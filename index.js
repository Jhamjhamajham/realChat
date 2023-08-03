var getUserMedia = require('getusermedia')

getUserMedia({ video: false, audio: true }, function (err, stream) {
    if (err) return console.error(err)

    var Peer = require('simple-peer')
    var peer = new Peer({
        initiator: location.hash == '#init',
        trickle: false,
        config: {
            iceServers: [
                {
                    urls: "stun:stun.relay.metered.ca:80",
                },
                {
                    urls: "turn:a.relay.metered.ca:80",
                    username: "71128f9aebad96f3278e17af",
                    credential: "JA3seYn6K/Vzq85c",
                },
                {
                    urls: "turn:a.relay.metered.ca:80?transport=tcp",
                    username: "71128f9aebad96f3278e17af",
                    credential: "JA3seYn6K/Vzq85c",
                },
                {
                    urls: "turn:a.relay.metered.ca:443",
                    username: "71128f9aebad96f3278e17af",
                    credential: "JA3seYn6K/Vzq85c",
                },
                {
                    urls: "turn:a.relay.metered.ca:443?transport=tcp",
                    username: "71128f9aebad96f3278e17af",
                    credential: "JA3seYn6K/Vzq85c",
                },
            ],
        },
        stream: stream
    })

    peer.on('error', function (error) {
        console.error('Peer error: ', error);
    });
    //   console.log(peer);
    peer.on('signal', function (data) {
        // console.log(data);
        try {
            document.getElementById('yourId').value = JSON.stringify(data);
        } catch (error) {
            console.error('Error updating yourId: ', error);
        }
    })

    document.getElementById('connect').addEventListener('click', function () {
        try {
            var otherId = JSON.parse(document.getElementById('otherId').value);
            peer.signal(otherId);
        } catch (error) {
            console.error('Error parsing otherId: ', error);
        }
    })

    document.getElementById('send').addEventListener('click', function () {
        try {
            var yourMessage = document.getElementById('yourMessage').value;
            peer.send(yourMessage);
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    })

    peer.on('data', function (data) {
        try {
            document.getElementById('messages').textContent += data + '\n';
        } catch (error) {
            console.error('Error updating messages: ', error);
        }
    })

    peer.on('stream', function (stream) {
        try {
            var video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = stream;
            video.play();
        } catch (error) {
            console.error('Error displaying stream: ', error);
        }
    })

});