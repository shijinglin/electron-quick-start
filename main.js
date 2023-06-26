// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

function createWindow () {
  // 当前运行的系统平台
  //console.log(process.platform) //win32

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // 启动位置
    // x:100,
    // y:100,
    // 最大/小宽高
    minWidth:500,
    minHeight:300,
    maxHeight:768,
    maxWidth:1024,
    // 禁止调整大小
    // resizable:false, 
    show:false, //界面默认不加载出来，配合后续内容加载完之后再显示。
    width: 800,
    height: 600,
    //默认title，界面为空时才会显示
    title:"新版客户端研究",
    //ico
    icon :"Component.ico",
    //frame: false, //关闭默认边框、和菜单， 后续自定义标题、图标和系统按钮， 配合 index2.html 查看效果 
    autoHideMenuBar: false, //隐藏菜单栏， 如果要自定义菜单，则不能隐藏
    //transparent:true,//透明背景
    //其他功能授权
    webPreferences: {
      nodeIntegration:true, //node.js 功能授权，允许子界面使用 “require”， 默认未授权，界面可能是第三方page
      contextIsolation:false, //配合上面属性使用
      enableRemoteModule:true, //启用remte, 渲染进程不允许直接使用 BrowserWindow， 只能用 remote 代替
      preload: path.join(__dirname, 'preload.js')
    }
  })
 
  //初始化remote对象
  require("@electron/remote/main").initialize();
  require("@electron/remote/main").enable(mainWindow.webContents);

  //#region  自定义菜单
  let memuTemp = [
    {
      label:"文件",
      submenu:[
        {
          label:"打开", 
          click: function(){
            console.log('点击了打开菜单')
          }
        },
        {type:'separator'},
        {
          label:"关于",
          role:'about' //系统自带了很多现成的功能定义  https://www.electronjs.org/docs/latest/api/menu-item#roles
        }
      ]
    },
    {label:"编辑"}
  ] 
  let memu = Menu.buildFromTemplate(memuTemp) 
  Menu.setApplicationMenu(memu)
  //#endregion

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  //mainWindow.loadFile('index2.html')

  //内容显示完成后，再显示主窗口 2023-6-25
  mainWindow.on('ready-to-show',()=>{
    mainWindow.show()
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
