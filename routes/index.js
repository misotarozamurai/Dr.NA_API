'use strict'

import express from 'express'
import moment from 'moment'
import config from 'config'

import * as file from '../utils/file.js'

const router = express.Router();

const resultPath = config.get('DataDir') + config.get('FileNames.Result');

router.route('/api')
	.post((req, res) => {
		// POST受け取り
		const _avg 		= req.body.avg 		|| 'no avg',
			  _height 	= req.body.height 	|| 'no height',
			  _name 	= req.body.name 	|| 'no name',
			  _message 	= req.body.message 	|| 'no message';
		
		const result = {
			"datatime"	: moment().format("YYYY-MM-DD"),
			"pulse"   	: { "avg": _avg },
			"height"  	: _height,
			"sick"	  	: {
				"name"		: _name,
				"message"	: _message,
			}
		}
		
		res.send(
			file.writeJson(resultPath, result)
		);
	})
	.get((req, res) => {
		// jsonファイル読み込み
		const jsonObj = file.readJson(resultPath);
		res.json({
			jsonObj
		});
	});

module.exports = router;