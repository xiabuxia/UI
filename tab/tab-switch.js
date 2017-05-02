 
 
 function Tab($ct){
            this.ct = $ct;
            this.init();
            this.bind();
        }

        Tab.prototype.init = function(){
            this.tabLi = this.ct.find('.tab-header li');
            this.tabHeader = this.ct.find('.tab-header') 
            this.tabContent = this.ct.find('.tab-content');
            console.log(this.tabContent)
        }
        Tab.prototype.bind = function(){
            var _this =this;
            this.tabHeader.on('click','li',function(){
                var index = $(this).index();

                $.each(_this.tabLi,function(index,item){
                $(item).removeClass('active');
                })
                $(this).addClass('active');

                $.each(_this.tabContent,function(index,item){
                    $(item).removeClass('show');
                })
                _this.tabContent.eq(index).addClass('show');
            })
            
        }


        var tab1 = new Tab($('.tab').eq(0))
        var tab2 = new Tab($('.tab').eq(1))