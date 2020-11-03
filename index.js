var data0 = [
    { name: "王月", sex: "m", age: "20", src: './img/1.jpg', des: "玩的很溜" },
    { name: "王月", sex: "f", age: "20", src: './img/2.jpg', des: "玩的很溜" },
    { name: "小明", sex: "m", age: "16", src: './img/3.jpg', des: "玩的很溜" },
    { name: "唐儿", sex: "f", age: "20", src: './img/4.jpg', des: "玩的很溜" },
    { name: "纳兹", sex: "m", age: "19", src: './img/5.jpg', des: "玩的很溜" },
    { name: "周铭", sex: "m", age: "20", src: './img/6.jpg', des: "玩的很溜" },
    { name: "瑞兹", sex: "f", age: "20", src: './img/7.jpg', des: "玩的很溜" },
    { name: "维恩", sex: "m", age: "18", src: './img/8.jpg', des: "玩的很溜" },
    { name: "伊泽", sex: "m", age: "20", src: './img/9.jpg', des: "玩的很溜" },
    { name: "洛克", sex: "m", age: "12", src: './img/10.jpg', des: "玩的很溜" },
    { name: "辛德", sex: "f", age: "20", src: './img/11.jpg', des: "玩的很溜" },
    { name: "魔偶", sex: "f", age: "12", src: './img/12.jpg', des: "玩的很溜" }
]
var ul = document.getElementsByTagName('ul')[0];
var input = document.getElementsByClassName("stext")[0];
var btn = document.getElementsByClassName("btn")
var arrbtn = [].slice.call(btn, 0)
var lastActive = arrbtn[0];
//全局变量用于多层过滤,获得全局操作后改变的数据筛选条件
var filtertext = '', filtersex = "a";

//渲染页面
function randerPage(data) {
    //每次渲染数据前将页面清空
    var domStr = "";
    ul.innerHTML = "";
    data.forEach(function (ele, index, shelf) {
        domStr = domStr + ` <li><img src="${ele.src}" alt=""><p class="name">${ele.name}</p><p class="des">${ele.des}</p></li>`
    })
    ul.innerHTML = domStr
}
//输入过滤
function textfilter(arr, text) {
    if (!text) {
        return arr
    } else {
        return arr.filter(function (ele, index, shelf) {
            return ele.name.indexOf(text) != -1;
        })
    }
}
//按钮性别过滤
function sexfilter(arr, sex) {
    if (sex == "a") {
        return arr;
    } else {
        return arr.filter(function (ele) {
            return ele.sex == sex;
        })
    }
}
//搜索防抖
function debounce(hanlder, delay) {
    var timer = null;
    return function () {
        // 一个保存触发事件元素，一个保存事件对象
        var _self = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
            //一个改变this指向触发元素input，一个传入实参列表，实参列表第一项就是事件对象
            hanlder.call(_self)
        }, delay)
    }
}
//初始化页面
randerPage(data0);
//用于防抖+叠加过滤
function execute() {
    filtertext = this.value;
    var textData = textfilter(data0, filtertext);
    var endData = sexfilter(textData, filtersex)
    randerPage(endData);
}
//绑定输入事件
input.oninput = debounce(execute, 100)
//绑定性别筛选
arrbtn.forEach(function (ele) {
    ele.onclick = function () {
        ele.className = "btn active";
        lastActive.className = "btn";
        lastActive = ele;
        //叠加过滤
        filtersex = this.getAttribute("sex")
        var sexData = sexfilter(data0, filtersex);
        var endData = textfilter(sexData, filtertext)
        randerPage(endData)
    }
})