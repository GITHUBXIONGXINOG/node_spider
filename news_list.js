const http = require('http')

const url = 'http://www.itcast.cn/news/json/f1f5ccee-1158-49a6-b7c4-f0bf40d5161a.json'
//创建请求对象
let req = http.request(url, {method:'get', headers: {
    'Accept-Ranges': 'bytes',
    'Age': '971943',
    'Cache-Control': 'max-age=31536000',
    'Content-Length': '281',
    'Content-Type': 'text/javascript',
    'Date': 'Thu, 20 May 2021 08:19:47 GMT',
    'Etag': "4078521116",
    'Expires': 'Mon, 09 May 2022 02:20:44 GMT',
    'Last-Modified': 'Wed, 25 Nov 2015 07:47:55 GMT',
    'Ohc-Cache-Hit': 'cqcm84 [4]',
    'Ohc-Response-Time': '1 0 0 0 0 0',
    'Server': 'JSP3/2.0.14',
    'Vary': 'Accept-Encoding'
        }},res => {
    let chunks = []
    res.on('data',chunk => {
        chunks.push(chunk)
    })
    res.on('end', () => {
        //Buffer.concat(chunks) 拼接成完整的数据流
        let result = Buffer.concat(chunks).toString('utf-8')
        // console.log(JSON.parse(result).data);
        let arr = JSON.parse(result).data.map(item => {
            return {
                title: item.title,
                lead: item.lead
            }
        })
        console.log(arr);
    })
})
//发送请求
req.end()
