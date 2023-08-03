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
    //   console.log(peer);
    peer.on('signal', function (data) {
        // console.log(data);
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', function () {
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })

    document.getElementById('send').addEventListener('click', function () {
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
    })

    peer.on('data', function (data) {
        document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream', function (stream) {
        var video = document.createElement('video');
        document.body.appendChild(video);
        video.srcObject = stream;
        video.play();
    })

});