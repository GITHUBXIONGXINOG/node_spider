//导入http模块
const http = require('http')
//导入cheerio模块
const cheerio = require('cheerio')
//导入download模块
const download = require('download')
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
        //使用encodeURI对url中的中文进行base64编码
        let imgs = Array.prototype.map.call($('.maincon .clears .main_pic > img'), item => HOST + encodeURI($(item).attr('src')))
        // console.log(imgs);
        //download(url, 路径)
        Promise.all(imgs.map(x=>download(x, 'dist'))).then(()=>{
            console.log('files download!');
        })
    })
})
//发送请求
request.end()