import $ from './jquery.js'


define(['jquery'],function(){

       var carousel = (function(){

        function Carousel($ct){
            this.ct = $ct;
            this.init(); 
            this.bind(); 
            this.setTime(); 
            
        }

        Carousel.prototype = {
            init: function(){
                this.img = this.ct.find('img');
                this.imgLength = this.img.length;
                this.ulCarousel = this.ct.find('.carousel-img');
                this.carouselChlid = this.ulCarousel.children();
                this.btnPre = this.ct.find('.btn-pre');
                this.btnNext = this.ct.find('.btn-next');
                this.bullet = this.ct.find('.bullet');
                this.imgWidth = this.img.eq(0).width();
                this.pageIndex = 0;
                this.lock = false;
                this.ulCarousel.css({'left':'-'+this.imgWidth+'px',
                                    'width': this.imgWidth*this.imgLength+'px'
                                });
            },
            bind: function(){
                var _this = this;
                this.appendClone();
                this.btnNext.on('click',function(){
                    _this.playNext();
                });
                this.btnPre.on('click',function(){
                     _this.playPre();
                })
                this.activeBullet();


            },

            appendClone: function(){
            var $firstImg = this.carouselChlid.first().clone(),
                $lastImg = this.carouselChlid.last().clone();
                this.ulCarousel.append($firstImg);
                this.ulCarousel.prepend($lastImg);

                this.newImgNum = this.ct.find('.carousel-img img').length
                this.ulCarousel.css({
                    width: this.newImgNum*this.imgWidth
                })
                    
            },

            playNext: function(){
                var _this = this; 
                    if(_this.lock) return;
                    this.lock = true;
                $(_this.ulCarousel).animate( {'left':'-='+this.imgWidth+'px'},function(){
                    _this.pageIndex++;
                    if(_this.pageIndex === _this.img.length){
                        _this.ulCarousel.css('left','-'+_this.imgWidth+'px')
                        _this.pageIndex = 0;     
                    }
                    _this.lock = false;
                    _this.setBullet();  
                   })       
            },
            setTime: function(){
                var _this = this;
                setInterval(function() {
                    _this.playNext()
                }, 3000);
            },

            playPre: function(){
                var _this = this;
                    if(_this.lock) return;
                    _this.lock = true;
                    _this.ulCarousel.animate({'left':'+='+this.imgWidth+'px'},function(){
                        _this.pageIndex--;
                        if(_this.pageIndex === -1){
                            _this.ulCarousel.css('left','-'+_this.imgLength*_this.imgWidth+'px');
                            _this.pageIndex = 3;
                        }
                        _this.lock = false;
                        _this.setBullet();
                    })
            },

            setBullet: function(){
                $.each(this.bullet.children(),function(index,item){
                    $(item).removeClass('show');
                })
                this.bullet.children().eq(this.pageIndex).addClass('show');
            },

            activeBullet: function(){
                var _this = this;
                this.bullet.on('click','li',function(){
                    $.each(_this.bullet.children(),function(index,item){
                        $(item).removeClass('show');
                    })

                    $(this).addClass('show');
                    var $index = $(this).index()+1;
                    _this.pageIndex = $(this).index();
                    _this.ulCarousel.animate({'left':-$index*_this.imgWidth+'px'})
                })
            }
        }

        // var carousel1 = new Carousel($('.carousel-ct').eq(0));
        // var carousel1 = new Carousel($('.carousel-ct').eq(1));

        
            
            return  {
                init: function(){
                    $.each($('.carousel-ct'),function(index,item){
                        new Carousel($(item))
                    });
                }


            }
        })();

           return carousel
})
