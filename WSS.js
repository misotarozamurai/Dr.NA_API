import WebSocket from 'ws';
import Util from './utils/util';

export default class WSS extends WebSocket.Server {
  constructor(options, callback) {
    super(options,callback);
    this.on('connection',this._connection);
    this.fromSock = {};
  }

  _connection(sock, req) {
    Util.log("webSocketServer connected!");
    // Output connected IP address
    const ip = req.connection.remoteAddress;
    Util.log(`connected IP : ${ip}`);

    // Store socket in array
    Util.log(`connected sockets : ${this.clients.size}`);
    // ----- When receiving a message -----
    sock.on('message', message => this._message(message, sock));

    // ----- When the socket is disconnected -----
    sock.on('close', (code, reason) => this._close(code, reason, sock));
  };

  _message(message, sock) {
    Util.log(`received : ${message}`);
    this._broadcast(message, sock);
  }

  _close(code, reason) {
    Util.log(
      'stopping client send "close"',
      `code: ${code}`,
      `reason:`,
      reason.split(/\.|.{100}/)
    );
    Util.log(`connected sockets : ${this.clients.size}`);
  }

  _broadcast(message,sock) {
    this.clients
      .forEach( client => {
        if(client!==sock)socket.send(message)
      });
  }
}