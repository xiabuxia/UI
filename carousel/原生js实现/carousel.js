
(function(){

    function Carousel($ct){
        this.ct = $ct;
        this.init()
        this.bind()
        
    }

    Carousel.prototype = {
        init: function(){
            this.parentNode = document.querySelector(this.ct);
            this.btnPre =  document.querySelector('.btn,pre');
            this.btnNext =  document.querySelector('.next');
            console.log( this.btnNext)
            this.imgCt = this.parentNode.firstElementChild;
            this.childNode = this.imgCt.querySelectorAll('li');

            //把第一张图片克隆一份放到最后，把最后一张克隆一份放到第一
            var firstChild = this.imgCt.firstElementChild.cloneNode(true),
                lastChild = this.imgCt.lastElementChild.cloneNode(true);
                this.imgCt.appendChild(firstChild);
                this.imgCt.insertBefore(lastChild,this.imgCt.firstElementChild);

            //设置包裹图片框的宽度，以便让图片浮动能成一排
            var imgWidth = getComputedStyle(this.childNode[0].firstElementChild).width, //500px string
                n = imgWidth.substring(0,imgWidth.indexOf('px'));
                this.imgWidth = Number(n); //把得到的宽度字符串转成数字
                this.width = this.imgWidth;
                this.childNode = this.imgCt.querySelectorAll('li');
                this.imgCt.style.width = this.imgWidth*this.childNode.length + "px";

            // 重新设置一下图片框的位置，以便显示的是原来的第一张图片

                this.imgCt.style.left = -this.imgWidth+'px';
        },
        bind: function(){
            var _this = this;

            this.btnPre.addEventListener('click',function(e){
                e.stopPropagation();
                _this.imgWidth -= _this.width;
                _this.imgCt.style.left = -_this.imgWidth+'px';
                // 判断，到了边界则回到显示的最后一张
                if(_this.imgWidth === 0){
                     _this.imgWidth = _this.width*(_this.childNode.length-2);
                     _this.imgCt.style.left = -_this.imgWidth+'px';
                }
            })
            this.btnNext.addEventListener('click',function(e){
                e.stopPropagation();
                _this.imgWidth += _this.width;
                _this.imgCt.style.left = -_this.imgWidth + 'px';
                // 判断，到了边界则回到显示的第一张
                if(_this.imgWidth === _this.width*(_this.childNode.length-1)){
                    _this.imgWidth = _this.width;
                     _this.imgCt.style.left = -_this.imgWidth+'px';
                }
            })


        }

    }



    window.carousel = function($ct){
        return new Carousel($ct)
    }

})()
carousel('.carousel-window')
