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
       this.renderable.addAnimation("walk", [5, 6, 7, 8, 9], 80);
       this.renderable.addAnimation("attack", [10, 11, 12, 13, 14, 14, 13, 12, 11, 10], 50);
       
       this.renderable.setCurrentAnimation("idle");
   },
   
    update: function(delta){
         this.checkKeyPressesAndMove();
         this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
        
         checkKeyPressesAndMove: function(){
         if (me.input.isKeyPressed("right")) {
            this.moveRight();
        }else if(me.input.isKeyPressed("left")){
            this.moveLeft();
        }else{
            this.body.vel.x = 0;
        }
         if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
            this.jump();
            }else if(this.body.vel.y===0){
            this.jumping = false;
        }
       this.attacking = me.input.isKeyPressed("attack");
    },
    //moves the player to the right
    moveRight: function(){
        //adds to the position of the x by the velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(false);
    },
    //moves the player to the left
    moveLeft: function(){
         this.facing = "left";
            this.body.vel.x-=this.body.accel.x *me.timer.tick;
            this.flipX(true);
    },
    //makes the player jump 
    jump: function(){
        this.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },
                
      setAnimation: function(){
      if(this.attacking){
            if(!this.renderable.isCurrentAnimation("attack")){
                //Sets the current animation to attack and once that is over
                //goes back to the idle animation...
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that next time we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switch to another animation
                this.renderable.setAnimationFrame();
            }
        }
        //if player is not attcking then the player is walking
       else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        //if the player is not attacking then the player is in idle
        }else if(!this.renderable.isCurrentAnimation("attack")){        
            this.renderable.setCurrentAnimation("idle");
        }  
    },
    
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            this.collideWithEnemyBase(response);
      }else if(response.b.type==='EnemyCreep'){
          this.collideWithEnemyCreep(response);
     }
   }
      
      
       
  });