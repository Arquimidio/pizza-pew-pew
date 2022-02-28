import Entity from "./Entity.js" // Can you feel his presence?

class Player extends Entity{


    constructor(screen, width, height, color){
        super('./assets/images/Leon/leon.png')
        this.width = width
        this.height = height
        this.context = screen.context
        this.x = window.innerWidth/2
        this.y = window.innerHeight - (window.innerHeight * 20/100)
        this.speed = 30
        this.color = color
        this.screen = screen
        this.lives = 3
        this.class = 'player'
    }

    // Well...
    move(event){
        if(event.code === 'ArrowLeft'){
            this.x -= this.speed
        }else if(event.code === 'ArrowRight'){
            this.x += this.speed
        }
    }

    // This makes the player responsive to screen resizing

    reposition(){
        this.x = window.innerWidth/2
        this.y = window.innerHeight - (window.innerHeight * 20/100)
    }

    // Add the necessary smurfs
    initializePosition(){
        window.addEventListener('resize', this.reposition.bind(this))
        window.addEventListener('keydown', this.move.bind(this))
        return this
    }

    update(){
        this.render()
    }

}

export default Player