var Exposure = (function(){

        function exposure($target,callback){
            this.$target = $target;
            this.callback = callback;
            this.bind();
            this.check();
        }



        exposure.prototype.bind = function(){
            var _this = this;
            $(window).on('scroll',function(){
               _this.check();
            })

        };
        exposure.prototype.check = function(){
            if(this.isShow()){
                this.callback(this.$target);
            }
        }
        exposure.prototype.isShow = function(){
            if(this.$target.hasClass('load')) return;
            var $winHeight = $(window).height(),
                $scrollTop = $(window).scrollTop(),
                $offsetTop = this.$target.offset().top,
                $nodeHeight = this.$target.height();
            if($winHeight+$scrollTop > $offsetTop && $scrollTop < $offsetTop+$nodeHeight){
                this.$target.addClass('load')
                return true;
            }else {
                return false;
            }
        };

       return {
            init: function($target,callback){
                 $.each($target,function(index,item){
                    new exposure($(item),callback)
                })
            }
        }
    })();

        function showImgs($node){
            var imgUrl = $node.attr('data-src');
                $node.attr('src',imgUrl)
        }

        Exposure.init($('img'),function($node){
               showImgs($node)
        })

        Exposure.init($('#hello'),function($node){
               $node.html($node.html()+$('#world').html())
        })