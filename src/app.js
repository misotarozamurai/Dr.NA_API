'use strict'

import express from 'express'
import router from './models/route/v1/'
import config from 'config'

const app = express();

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
const port = config.get('ServerAPI.port') || 8881;

app.use('/api/v1/', router);

// サーバ起動
app.listen(port);
console.log('listen on port = ' + port);