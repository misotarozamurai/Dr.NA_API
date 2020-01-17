import WebSocket from 'ws';
import { log } from './utils/util';

export default class WSS extends WebSocket.Server {
    constructor(options, callback) {
        super(options,callback);
        this.on('connection',this._connection);
        this.connects = [];
        this.accessSock = {};
    }

    _connection(sock, req) {
        log("webSocketServer connected!");
        // Output connected IP address
        const ip = req.connection.remoteAddress;
        log("connected IP : " + ip);

        // Store socket in array
        this.connects.push(sock);
        log('connected sockets : ' + this.connects.length);

        this.accessSock = sock;

        // ----- When receiving a message -----
        sock.on('message', this._message.bind(this));

        // ----- When the socket is disconnected -----
        sock.on('close', this._close);
    };

    _message(message) {
        log('received : ' + message);
        this._broadcast(message);
    }

    _close() {
        log('stopping client send "close"');

        // Exclude broken sockets from array
        this.connects = this.connects.filter( (conn, i) => {
            return (conn === sock) ? false : true;
        });

        log('connected sockets : ' + connects.length);
    }

    _broadcast(message) {
        this.connects
            .filter(t=>t!==this.accessSock)
            .forEach(socket => {
                socket.send(message);
            });
    }
}