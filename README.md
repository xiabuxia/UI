# 用jQuery实现的轮播、tab切换、日历、提示框等UI组件



<i>注意：例子中图片的路径有的不太对</i>


## goTop.js（当出现滚动条时显示 顶部按钮）

### html 

        <div class="gotop">回到顶部</div>

### css

        .gotop {
            position: fixed;
            right: 50px; 
            bottom: 20px; // 显示在窗口的位置
            text-align: center; //文字水平居中
            width: 100px;
            height: 40px;  //按钮大小
            line-height: 40px;  //文字垂直居中
            border: 1px solid #fff; 
            background: #ccc; 
            display: none;
            z-index: 9999;
            border-radius: 5px;
            cursor: pointer;
        }
### js

        import goTop from './goTop'
        
        goTop.init()

## carousel.js (无限轮播)

### html 

        <div class="carousel-ct"> 
            <ul class="carousel-img">
                <li>
                    <a href="javaScript:void[0]"><img src="imgs/gao4-1.png" alt=""></a>
                </li>
                <li>
                    <a href="javaScript:void[0]"><img src="imgs/gao4-2.png" alt=""></a>
                </li>
                <li>
                    <a href="javaScript:void[0]"><img src="imgs/gao4-3.png" alt=""></a>
                </li>
                <li>
                    <a href="javaScript:void[0]"><img src="imgs/gao4-4.png" alt=""></a>
                </li>
            </ul>
            <div class="carousel-btn btn-pre"></div>
            <div class="carousel-btn btn-next"></div>
                <ul class="bullet">
                    <li class="show"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>

### css
    
        <link rel="stylesheet" href="carousel.css">
    
### js

        import carousel from './carousel.js'


## tab切换

### html

        <div class="tab">
                <ul class="tab-header clearfix">
                    <li class="active">选项1</li>
                    <li>选项2</li>
                    <li>选项3</li>
                </ul>
                <ul class="tab-content show">
                    <li>内容1</li>
                </ul>
                <ul class="tab-content">
                    <li>内容2</li>
                </ul>
                <ul class="tab-content">
                    <li>内容3</li>
                </ul>
        </div>

### css

        <link rel="stylesheet" href="tab-switch.css">
    
### js

        <script src="jquery.js"></script>
        <script src="tab-switch.js"></script>

## Modal组件（一些提示框的样式）

## exposure.js
### html

        <ul class="container">
            <li>
                <a href="#"><img src="http://kejian.jirengu.com/blank.jpg" data-src="img/1.jpg" /></a>//src指向为显示加载的图 //data-src才是真正显示的图,
            </li>
            ...
            <p id="hello">hello</p>
            <p id="world">world</p> //显示完之后的提示信息
        </ul>

### css

        ul {list-style: none;}
        .container {width: 720px;margin: 0 auto;}
        .container li {margin: 5px;float: left;}
        .container img {width: 350px;height: 320px;}
        p {float: left;}

### js(已封装，没export)

        <script src="jquery.js"></script>
        <script src="exposure.js"></script>

## calender.js
### html

        <input class="date-ipt" type="text" placeholder="有初始值" date-init="2016/04/04" />
        <input class="date-ipt" type="text" placeholder="无初始值">

### css

        <link  rel="stylesheet" href="calender.css">

### js
         <script src="jquery.js"></script>
         <script src="calender.js"></script>

    