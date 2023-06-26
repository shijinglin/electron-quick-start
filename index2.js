const remote = require("@electron/remote")

window.addEventListener('DOMContentLoaded',()=>{

    let mainwindow = remote.getCurrentWindow()

    // 重写关闭前的时间
    window.onbeforeunload = function(){
        console.log("onbeforeunload")
        let obox = document.getElementsByClassName('isClose')[0]
        obox.style.display='block'

        let btnok = obox.getElementsByTagName('span')[0]
        let btncancel = obox.getElementsByTagName('span')[1]

        btnok.addEventListener('click',()=>{
            mainwindow.destroy()
        })

        btncancel.addEventListener('click',()=>{
            obox.style.display='none';
        })
        
        return false
    }

    // 获取元素，添加点击事件
    let btn = document.getElementsByClassName("windowTool")[0].getElementsByTagName('div')
    btn[0].addEventListener('click',()=>{
        //关闭
        mainwindow.close()
    })
    btn[1].addEventListener('click',()=>{
        console.log("max")
        //max
        if(!mainwindow.isMaximized()){
            mainwindow.maximize()
        }else{
            mainwindow.restore()
        }
    })
    btn[2].addEventListener('click',()=>{
        //min
        mainwindow.minimize()
    })
})