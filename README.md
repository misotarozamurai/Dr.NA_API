# Dr.NA_API

name : Masakatsu Shibata

JSONを返すAPI <br />
※ DBは別サーバにあるため使用しない。

## ■ 準備

``` shell
$ mkdir JSON_API
$ cd JSON_API
$ npm init -y
```

## ■ インストール

- babel

	``` shell
	$ npm i -D @babel/core @babel/cli @babel/preset-env
	```

- corejs

	``` shell
	$ npm i -S core-js@3
	```

- Express

	``` shell
	$ npm i -S express
	```

- moment

	``` shell
	$ npm i -S moment
	```

- config

	``` shell
	$ npm i -S config
	```

## ■ 設定

- babel

	<a href="./.babelrc">`.babelrc`</a> に記載

- `run` コマンド

	``` json
	{
		"scripts": {
				"build": "babel src -d app",
				"start": "node app/app.js"
		}
	}
	```

## ■ 運用

- 準備

	``` shell
	$ npm i
	```

- ビルド

	``` shell
	$ npm run build
	```

- 起動

	``` shell
	$ npm run start
	```

<p>&copy;2020 Dr.NA_API</p>
