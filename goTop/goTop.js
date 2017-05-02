requirejs.config({
    paths: {
         jquery: './jquery'
    }  
})

define(['jquery'],function(){
    var goTop = (function(){
        
        function GoTop($ct){
            this.$ct = $ct;
            this.init();
            this.bind();
            console.log(1)
        }

        GoTop.prototype = {
            init: function(){
               this.lock = true;
               this.winScrollTop = $(window).scrollTop()
               this.show()
            },
            bind: function(){
                var _this = this;
                $(window).on('scroll',function(){
                _this.winScrollTop = $(window).scrollTop()
                    _this.show() 
               });
               this.$ct.on('click',function(){
                   $(window).scrollTop(0)
               })
               
            
            },
            
            show: function(){
                if(this.lock && this.winScrollTop > 0){
                     this.$ct.show(); 
                     this.lock = false  
                }else if(this.winScrollTop === 0){
                    this.$ct.hide();
                    this.lock = true
                  
                }
            }


        }
            return {
                init: function(){
                    new GoTop($('.gotop'));
                }
            }

    })()
        return goTop
})