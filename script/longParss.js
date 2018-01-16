(function(w){
        var eventFun = {
                touchstart:function(e){
                         e.preventDefault();
                         var et = e.touches[0];
                         this.startX = et.pageX;
                         this.startY = et.pageY;
                         longTap(this);


                },
                touchmove:function(e){
                        var listener = this.listener;
                        var et = e.touches[0];
                         this.endX = et.pageX;
                         this.endY = et.pageY;
                         if(Math.abs(this.endX - this.startX) > 10 || Math.abs(this.endY - this.startY) > 10){
                                clearTimeout(listener.longTap.longTimeOutId);
                         }


                },
                touchend:function(e){
                        var changedTouches = e.changedTouches;
                        var isFirst = false;
                        for(var i=0,len=changedTouches.length;i<len;i++){
                                if(changedTouches[i].identifier == 0){
                                        isFirst = true;
                                        break;
                                }
                        }
                        if(!isFirst){
                                return
                        }
                        e.preventDefault();
                        var listener = this.listener;
                        clearTimeout(listener.longTap.longTimeOutId);
                        var listener = this.listener;



                },
                touchcancel:function(e){
                        var listener = this.listener;
                        clearTimeout(listener.longTap.longTimeOutId);
                }


        }
        var touchName = ['touchstart','touchmove','touchend','touchcancel'];
        var bind = function(view){
                view.listener = {};
                for(var i in touchName){
                        view.addEventListener(touchName[i],eventFun[touchName[i]],false)
                }

        }

        var longTap = function(view){
                var listener = view.listener;
                if(!listener.longTap ){
                        return;
                }
                listener.longTap.longTimeOutId = setTimeout(function(){
                        var call = listener.longTap.callbacks;
                        for(var i in call){
                                call[i]&&call[i].call(view);
                        }
                },800);

        }

        window.on = function(view,name,callback){
                if(!view.listener){
                        bind(view);
                }
                var listener = view.listener || {};
                if(!listener[name]){
                        listener[name] = {
                                callbacks:[]
                        }
                }
                var evt = listener[name] ;
                evt.callbacks.push(callback);


        };


        /*
         * 使用方法: 直接引进html文件就能出发长安事件
         *
         */
        // on(document,'longTap',function(){
        //         alert(this);
        // });
        // on(document,'longTap',function(){
        //         alert('长按2');
        // });
        // on(document,'longTap',function(){
        //         alert('长按3');
        // });







})(window);
