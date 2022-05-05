# 微樂志工-前台/後台

## Version Information

Node Version : 14.17.4 <br />
nuxt Version : ^2.15.8 <br />

## env.json setting

1. root/envExample.js 複製環境參數

2. 至 root/static/env.json 貼上

## install dependencies

npm i

## npm run `scripts`

dev: 開發模式<br />
generate: 將每個路由生成為 HTML 文件並靜態導出到 dist/ 目錄（用於靜態）<br />
build: Build SSR <br />
start: 開啟 web servive<br />

## Deploy

1. npm run build

2. 以下都丟到遠端目錄
   .nuxt
   static
   nuxt.config.js
   package.json

3. ==[遠端機器安裝 node](https://titangene.github.io/article/nvm.html)==
   PS : node 版本要切到和專案一樣的(node version: 14.17.4)

4. cd /[進入放上面 4 個檔案的資料夾]

5. npm i

6. npm start
