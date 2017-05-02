
        function ShowCalender($target){
            this.$target = $target;
            this.init($target);
            this.render();
            this.setData();
            this.bind();
            
            //this.bind();

            
        }

        ShowCalender.prototype = {

            init: function($target){
                this.$target = $target;
                
                // 如果标签里面有又设置默认日期，则按照默认日期计算
                if(this.isInitDate($target.attr('date-init'))){
                    this.date = new Date($target.attr('date-init'));
                    this.watchDay = new Date($target.attr('date-init'));

                }else{
                    this.date = new Date();
                    this.watchDay = new Date();
                }
            },

            render: function(){
                var html  =  '<div class="calender">';
                    html +=     '<div class="header">';
                    html +=         '<span class="cal-pre"></span>';
                    html +=         '<span class="cur-date"></span>';
                    html +=         '<span class="cal-next"></span>';
                    html +=     '</div>';
                    html +=     '<table class="panel">';
                    html +=         '<thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>';
                    html +=         '<tbody></tbody>'
                    html +=     '</table>'
                    html += '</div>'
                this.$datePanel = $(html)
                this.$datePanel.insertAfter(this.$target)
                                .css({
                                    'display': 'none',
                                    'position': 'absolute',
                                    'left': $(this.$target).offset().left,
                                    'top': this.$target.offset().top + this.$target.outerHeight(true) 
                                })
            },

            setData: function(){
                 
                var firstDay = this.getFirstDay(this.watchDay),
                    lastDay = this.getLastDay(this.watchDay);
                
                var dateArr = [];
                for(var i=firstDay.getDay();i>0;i--){
                    var preDate = new Date(firstDay.getTime() - i*60*60*24*1000 );
                        dateArr.push({type:'pre',date:preDate});
                }

                for(var j=0;j<lastDay.getDate()-firstDay.getDate()+1;j++){
                    var curDay = new Date(firstDay.getTime() + j*60*60*24*1000);
                        dateArr.push({type:'cur',date:curDay});
                }

                for(var k=1;k<7-lastDay.getDay();k++){
                    var nextDay = new Date(lastDay.getTime()+k*60*60*24*1000);
                    dateArr.push({type:'next',date:nextDay})
                }
                // console.log(this.watchDay.getFullYear()+'年'+(this.watchDay.getMonth()+1)+'月')
                this.$datePanel.find('.cur-date').text(this.watchDay.getFullYear()+'年'+(this.watchDay.getMonth()+1)+'月');

                var html = '';
                for(var i=0;i<dateArr.length;i++){
                    if(i%7 === 0){
                        html = '<tr>' + html;
                    }
                    html += '<td class=';
                    if(dateArr[i].type === 'pre'){
                        html += '"pre-month"';
                    }else if(dateArr[i].type === 'cur'){
                        html += '"cur-month"';
                    }else{
                        html += '"next-month"';
                    }
                    // 找到当前日期加上标记
                    if(this.getYMD(this.date) === this.getYMD(dateArr[i].date)){
                        html += '"cur-date"';
                    } 
                    html += 'data-data=' + this.getYMD(dateArr[i].date)+'>' ;
                    html += this.toFormate(dateArr[i].date.getDate()) + '</td>';

                    if(i%7 === 6){
                       // console.log('1')
                        html += '</tr>' // 在每排的最后(第7 14 21 28 35个后)加上</tr>
                    }
                }
                this.$datePanel.find('tbody').html(html);
            },

            bind: function(){
                var _this = this
                this.$target.on('click',function(e){
                    e.stopPropagation();
                    _this.$datePanel.show();

                   // console.log(_this.$datePanel.find('.cur-month'))
                })
                this.$datePanel.on('click','.cur-month',function(){
                         // console.log(this) 
                    _this.$target.val($(this).attr('data-data'))
                     _this.$datePanel.hide();
                })
                this.$datePanel.on('click',function(e){
                    e.stopPropagation();
                })
                $(window).on('click',function(){
                    _this.$datePanel.hide();
                })
               
               this.$datePanel.find('.cal-next').on('click',function(){
                  _this.watchDay = _this.getNextMonth(_this.watchDay);
                  _this.setData();
               })
               this.$datePanel.find('.cal-pre').on('click',function(){
                  _this.watchDay = _this.getPreMonth(_this.watchDay);
                   _this.setData()
               })
            },

            isInitDate: function(date){
                var aa = new Date(date).toString() !== 'Invalid Date';
                return aa
            },

            getNextMonth: function(date){
                var year = date.getFullYear(),
                    month = date.getMonth(),
                    day = date.getDate();
                if(month === 12){
                    month = 1;
                    year++;
                }else{
                    month++
                }
                return newDate = new Date(year,month,day)
            },
            getPreMonth: function(date){
                var year = date.getFullYear(),
                    month = date.getMonth(),
                    day = date.getDate();
                if(month === 1){
                    month = 12;
                    year--;
                }else{
                    month--
                }
                return newDate = new Date(year,month,day)
            },

            getFirstDay: function(date){
               // console.log(date)
                var year = date.getFullYear(),
                    month = date.getMonth();
                return newDate = new Date(year,month,1)
            },

            getLastDay: function(date){
                var year = date.getFullYear(),
                    month = date.getMonth();
                    month++;
                if(month>11){
                    month = 0;
                    year++;
                }
                var newDate = new Date(year,month,1);
                return  new Date(newDate.getTime()-60*60*24*1000)
            },

            getYMD: function(date){
                // console.log(date)
                var year = date.getFullYear(),
                    month = date.getMonth()+1;
                    day = date.getDate();
                return year+'/'+this.toFormate(month) + '/' + this.toFormate(day) 
            },

           toFormate: function(n){
               return (n+'').length === 1 ? ('0'+n+'') : (n+'');
           }
    
         }

         $.fn.showCalender = function(){
             $(this).each(function(){
                 new ShowCalender($(this));
             })
         }
      $('.date-ipt').showCalender()