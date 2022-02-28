import Entity from "./Entity.js" // Can you feel his presence?

class Enemy extends Entity{

    constructor(screen, number, width, height, x, y, color, speed){
        super('./assets/images/Leon/nun.png')
        this.canvas = document.getElementById('screen')
        this.direction = true
        this.width = width
        this.height = height
        this.context = screen.context
        this.speed = speed
        this.x = x
        this.y = number < 10? y : number < 20? y + 100 : y + 200
        this.color = color
        this.number = number
        this.explosion = new Image()
        this.explosion.src = './assets/images/explosion.png'
        this.class = 'enemy'
        this.audio = new Audio('./assets/audio/brah.mp3')
    }

    update(){
        this.move()
        this.render()
    }

    // Changes the enemy moving direction and Y positioning when hit screen border
    checkDirection(){
        if(this.width + this.x >= this.canvas.width - 20 || this.x <= 0 + 20){
            this.direction = !this.direction
            this.y += 100
        }
    }
    
    // Keeps the enemy spaceships moving
    move(){
        this.checkDirection()
        if(this.direction){
            this.x += this.number % 10 * this.speed + 1
        }else{
            this.x -= this.number % 10 * this.speed + 1
        }
        
    }

    //Handles the audiovisual effects of an enemy death (Aka alien deletus)
    explode(){
        this.audio.play()
        this.context.drawImage(this.explosion, this.x, this.y, this.width, this.height)
    }

}

export default Enemy