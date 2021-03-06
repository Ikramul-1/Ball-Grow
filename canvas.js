//setup...
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var mouse = {
    x : undefined,
    y : undefined
}

var touch = {
    x : undefined,
    y : undefined
}

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
})

window.addEventListener('touchmove',
    function(ev){
        touch.x = ev.touches[0].clientX;
        touch.y = ev.touches[0].clientY;
})

window.addEventListener('resize', 
    function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
})

var colorAr = [
	"#12DBDE",
    "#00ECFF",
    "#00ABFF",
    "#005DFF",
    "#0012FF",
    "#FFE600",
    "#FFA400",
    "#FF7D00",
    "#FF7032",
    "#FF4D00"
];

//drawing...
function randCol(c1, c2, c3, a) {
				r = Math.floor(Math.random() * c1);
				g = Math.floor(Math.random() * c2);
				b = Math.floor(Math.random() * c3);
				return "rgba("+r+","+g+","+b+","+a+")";
}

function rgba(r = 1, g = 1, b = 1, a = 1) {
				return "rgba("+r+","+g+","+b+","+a+")";
}

function Circle(x, y, rad, spX = 0, spY = 0){
                this.x = x;
                this.y = y;
                this.spX = spX;
                this.rad = rad;
                this.min = rad;
                this.max = 65;
                this.spY = spY;
                this.col = colorAr[Math.floor(Math.random() * colorAr.length)];
                
                this.draw = function(){
                             c.beginPath();
				             c.arc(this.x, this.y, this.rad, 0, 50);
				             c.fillStyle = this.col;
                }
                
                this.bounce = function(){
                               this.x += this.spX;
				               this.y += this.spY;
				               if(this.x + this.rad > canvas.width || this.x - this.rad < 0){
                                         this.spX = -this.spX;
                                 }
                              if(this.y + this.rad > canvas.height || this.y - this.rad < 0){
                                         this.spY = -this.spY;
                              }
                              
                }
                
                this.grow = function(){
                				if(touch.x - this.x < 60 && touch.x - this.x > -60 && touch.y - this.y < 60 && touch.y - this.y > -60 && this.rad < this.max){
                	                   this.rad += 5;
								}else if(this.rad > this.min){
									this.rad -= 1;
                              }
                              
                              if(mouse.x - this.x < 60 && mouse.x - this.x > -60 && mouse.y - this.y < 60 && mouse.y - this.y > -60 && this.rad < this.max){
                	                   this.rad += 6;
								}else if(this.rad > this.min){
									this.rad -= 1;
                              }
                }
}

var cirAr = [ ];

for (var i = 0; i < 1000; i++){
	            var rad = Math.random() * 2 + 1;
	            var x = Math.random() * (innerWidth - rad * 2) + rad;
                var y = Math.random() * (innerHeight - rad * 2) + rad;
                var spX = (Math.random() - 0.5) * 4.5;
                var spY = (Math.random() - 0.5) * 4.5;
                cirAr.push(new Circle(x, y, rad, spX, spY));
}

function animate() {
				requestAnimationFrame(animate);
				c.clearRect(0, 0, canvas.width, canvas.height);
				
				for (var i = 0; i < cirAr.length; i++){
                            cirAr[i].draw();
                            c.fill();
                            cirAr[i].bounce();
                            cirAr[i].grow();
                }
				
}

animate();
