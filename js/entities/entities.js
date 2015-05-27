game.PlayerEntity = me.Entity.extend({
   init: function(x, y, settings){
       this._super(me.Entity, 'init', [x, y, {
               image: "player-1",
               width: 100,
               height: 100,
               spritewidth: "100",
               spriteheight: "100",
               getShape: function(){
                   return(new me.Rect(0, 0, 100, 100)).toPolygon();
               }
       }]);
   
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
   
       this.body.setVelocity(5, 20);
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("walk", [5, 6, 7, 8, 9], 100);
       
       this.renderable.setCurrentAnimation("idle");
   },
   
    update: function(delta){
      if(me.input.isKeyPressed("right")){
          this.body.vel.x += this.body.accel.x * me.timer.tick;
         
      }else{
          this.body.vel.x = 0;
      }
      if(this.body.vel.x !== 0){
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }else{
            this.renderable.setCurrentAnimation("idle");
        }
      
      
      
      this.body.update(delta);
      
      this._super(me.Entity, "update", [delta]);  
      return true;
  }
  });