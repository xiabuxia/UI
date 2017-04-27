
###  carousel useage 
#### html

        <div class="carousel-ct">
                <ul class="carousel-img">
                    <li>
                        <a href="#"><img src="imageUrl" alt=""></a>
                    </li>
                    <li>
                        <a href="#"><img src="imageUrl" alt=""></a>
                    </li>
                    <li>
                        <a href="#"><img src="imageUrl" alt=""></a>
                    </li>
                    <li>
                        <a href="#"><img src="imageUrl" alt=""></a>
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
#### css （example）
        .carousel-ct {
            width: 1000px; //定义一下外框的宽高
            height: 468px;
            position: relative;
            overflow: hidden;
         }
        .carousel-btn {
            border-top: 50px solid transparent;
            border-bottom: 50px solid transparent;
            position: absolute;
            top: 50%;
            margin-top: -50px;
            cursor: pointer;
            opacity: 0.6;
        }
        .btn-pre {
            border-right: 50px solid #999;
            left: 10px;
        }
        .btn-next {
            border-left: 50px solid #999;
            right: 10px;
        }
        .carousel-img {

            opacity: 0.9;
            position:absolute;
        }
        .carousel-img li {
            float: left;
        }
        .carousel-img img {
            width: 1000px; //定义一下自己想要的图片宽度,和外框的尺寸一样
            height: 468px;
        }
        .bullet { //小圆点的设置样式
            width: 100%;
            height: 30px;
            position: absolute;
            bottom: 0;
            text-align: center;
        }
        .bullet li  {
            width: 20px;
            height: 20px;
            margin-left: 10px;
            border-radius: 50%;
            background: #fff;
            display: inline-block;
            cursor: pointer;
        }
        .bullet .show {
            background: yellow;
        }

#### js
        import carsousel from './carousel'

        carousel.init() //执行