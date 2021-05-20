//导入http模块
const http = require('http')
//导入
const cheerio = require('cheerio')
const HOST = 'http://web.itheima.com'
//创建请求对象
let request = http.request(HOST + '/teacher.html#ajavaee', res => {
    //异步的响应
    let chunks = []
    //监听data事件,获取传递过来的数据片段
    res.on('data', chunk => {
        //拼接数据片段
        chunks.push(chunk)
    })
    //监听end事件,获取数据完毕时触发
    res.on('end', () => {
        //拼接所有的chunk,并转换成字符串 ==> html字符串
        let htmlStr = Buffer.concat(chunks).toString('utf-8')
        let $ = cheerio.load(htmlStr)
        // //    console.log($('.maincon .clears .main_pic > img'));
        // let imgs = []
        // $('.maincon .clears .main_pic > img').each((index, item) => {
        //     // console.log(HOST+$(item).attr('src'));
        //     imgs.push(HOST + $(item).attr('src'))
        // })
        let imgs = Array.prototype.map.call($('.maincon .clears .main_pic > img'), item => HOST + $(item).attr('src'))
        console.log(imgs);
    })
})
//发送请求
request.end()