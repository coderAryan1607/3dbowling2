AFRAME.registerComponent("bowling-ball",{
    init:function(){
        this.bowl()
        
    },
    bowl: function(){
        window.addEventListener("keydown",(e)=>{
          if(e.key==="z") {
            ball= document.createElement("a-entity");
            var cam = document.querySelector("#camera")
            pos=cam.getAttribute("position");
            ball.setAttribute("geometry", {
                primitive: "sphere",
                radius: 1,

            })
            ball.setAttribute("position", {
                x:pos.x,
                y:pos.y,
                z:pos.z
            })
            ball.setAttribute("material", "color", "white")
            var camera = document.querySelector("#camera").object3D;
            
            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            

            ball.setAttribute("velocity", direction.multiplyScalar(-10));
            ball.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:"0",
            })
            ball.addEventListener("collide", this.removeball)
            var scene= document.querySelector("#scene");
            scene.appendChild(ball);
          }
        })
    },
    removeball: function(e){
        var element = e.detail.target.el //bullet element
        var bodyELement = e.detail.body.el;//body element where the bullet hits
        if (bodyELement.id.includes("pin")){
          bodyELement.setAttribute("material", {
            opacity:0.6,
            transparent:true
          })
          var impulse = new CANNON.Vec3(0, 1, -15)
          var worldPoint =  new CANNON.Vec3().copy(bodyELement.getAttribute("position"))
          bodyELement.body.applyForce(impulse, worldPoint)
          element.removeEventListener("collide", this.removeball)
          var scene = document.querySelector("#scene");
          scene.removeChild(element)
        }
    
    
    
    },
    
})