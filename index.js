// 渲染进程不允许直接使用 BrowserWindow， 只能用 remote 代替
const remote = require("@electron/remote")   
//remote.BrowserWindow
const BrowserWindow = require("@electron/remote").BrowserWindow;

window.addEventListener('DOMContentLoaded',()=>{
    const newbtn= document.getElementById("newbtn")
    newbtn.addEventListener("click",()=>{
        //创建窗口
        let newwin = new BrowserWindow({
            show:false, 
            width:300,
            height:200,
            autoHideMenuBar:true, //关闭默认菜单 
            parent: remote.getCurrentWindow(), //设置父窗口，可浮与父窗口之上
            modal: true //模态窗口， 置顶窗口，父窗口不可操作。
        }) 

        newwin.loadFile("list.html")
 
        newwin.on('ready-to-show',()=>{
            newwin.show()
        })

        newwin.on("close",()=> {
            newwin=null
        })
    })
})