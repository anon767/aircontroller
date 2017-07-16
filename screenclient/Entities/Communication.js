var Communication = (function (Eventcallback, onopencallback) {
    var socket, send;

    this.socket = new WebSocket('ws://192.168.178.71:9300');
    this.socket.latency = 1;
    this.socket.ping = 1;
    this.socket.pong = 1;
    this.socket.open = onopencallback;
    this.socket.onerror = function (e) {
        console.log("error occured ", e);
    }
    this.socket.onmessage = function (s) {

        if (s.data === "hello") {
            this.open();
            return;
        }

        Eventcallback(JSON.parse(s.data));
    };

    this.send = function (data) {
        this.socket.send(JSON.stringify(data));
    };
});