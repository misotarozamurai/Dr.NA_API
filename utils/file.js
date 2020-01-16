'use strict'

import path from 'path'
import fs from 'fs'

// ファイルの存在確認
const check = filePath => {
	try {
		fs.statSync(filePath);
		return true;
	} catch(err) {
		return false;
	}
}

// ファイル読み込み
export const readJson = filePath => {
	if(!check(filePath)) throw 'no file';
	const _data = fs.readFileSync(path.resolve(filePath), 'utf-8');
	return JSON.parse(_data);
}

// ファイル書き込み
export const writeJson = (filePath, data) => {
	fs.writeFileSync(path.resolve(filePath), JSON.stringify(data), err => {
		if(err) throw err;
	});
	return true
}