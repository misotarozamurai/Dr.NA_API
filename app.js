'use strict'

import express from 'express'
import config from 'config'
import https from 'https'
import fs from 'fs'
import WSS from './WSS'

import router from './routes'

const app = express();

const HTTPS_OPTIONS = {
	key: fs.readFileSync(config.get('KeyRoot') + config.get('FileNames.Key')),
    cert: fs.readFileSync(config.get('KeyRoot') + config.get('FileNames.Cert')),
    ca: fs.readFileSync(config.get('KeyRoot') + config.get('FileNames.Chain'))
};
const httpsServer = new https.createServer(HTTPS_OPTIONS,app);

const WSS_OPTIONS = {
	server: httpsServer,
	path: '/ws'
};
const wss = new WSS(WSS_OPTIONS);

// body-parserの設定
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORSを許可する
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// port番号を指定
const port = config.get('Port') || 8881;

app.use('/', router);

// サーバ起動
// app.listen(port);
httpsServer.listen(
	port,
	()=>console.log('listen on port = ' + port)
);
