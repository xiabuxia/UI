requirejs.config({
    paths: {
         jquery: './jquery'
    }  
})

 define(['jquery'],function(){


        var waterFlow = (function(){

                function WaterFull($ct){
                this.$ct = $ct;
                this.init();
                this.ajax();
                
                this.bind();
                
                        
            }

            WaterFull.prototype = {
                init: function(){
                    this.$ul = this.$ct.find('.ct')
                    this.itemArr = [];
                    this.maxItemArr = [];
                    this.pageIndex = 0;
                    this.sliceIndex = 0;
                    this.loadBtn = this.$ct.parent().find('.loadMore');
                    this.loadShowMore = false;
                    this.lockGet = true;
                    this.num = 0;
                    this.lackLoad = false
                    
                },
                bind: function(){ 
                    var _this = this;
                    $(window).on('resize',function(){

                    });
                     this.loadBtn.on('click',function(){

                         _this.ajax();
                          
                })
                },
        
                layoutImg: function(){
                    var _this = this;         
                        this.$ct.find('ul').find('img').last()[0].onload = function(){
                            _this.show();
                        }

                   
                    
                },
                show: function(){
                    var _this = this;
                        _this.colLength = parseInt(_this.$ul.width()/ _this.$ct.find('li').eq(0).outerWidth());
                        var data = _this.$ct.find('li').slice(_this.sliceIndex,(_this.sliceIndex+_this.colLength+1));
                        if(_this.itemArr.length === 0){
                            for(var i=0;i<_this.colLength;i++){
                                _this.itemArr[i]=0;
                            };
                         }
                        $.each(data,function(index,item){
                            var minValue = Math.min.apply(null,_this.itemArr);
                            var minIndex = _this.itemArr.indexOf(minValue);  
                            
                            _this.sliceIndex++
                            $(item).css({
                                top: _this.itemArr[minIndex]+'px',
                                left: $(item).outerWidth(true)*minIndex+'px'
                            }) 
                            _this.itemArr[minIndex] += $(item).outerHeight(true);
                                               
                        }) 
                        var maxValue = Math.max.apply(null,_this.itemArr)
                        _this.$ct.css('height',maxValue)
                },
                ajax: function(){
                    var _this = this;
                    $.get('/login',{page:_this.pageIndex}).done(function(ret){
                        var img = this.imgUrl;
                        if(ret.status === 0 && ret.data.length !== 0){
                             _this.pageIndex++;
                            var html = '';
                            $.each(ret.data,function(index,item){
                                _this.index = index;
                                html  = '<li>';
                                html +=     '<img src="'+this.imgUrl+'">';
                                html += '</li>';
                                _this.$ct.find('ul').append(html)

                            })
        
                           _this.layoutImg()
                            
                        }else if (!_this.loadShowMore){
                            _this.$ct.parent().append('<p>没有更多了</p>').css('color','#fff')
                            _this.loadBtn.css('display','none')
                            _this.loadShowMore = true;
                            }
                            
                    })
                         
                        
                }
                
               
                }
                return {
                    init: function(){
                        new WaterFull($('.waterFlow'))
                    }
                }
        })()
            return waterFlow
    })