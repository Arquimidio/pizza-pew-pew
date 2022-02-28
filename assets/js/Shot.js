import Entity from "./Entity.js"

class Shot extends Entity{

    constructor(screen, x, y){
        super('./assets/images/Leon/slice.png')
        this.context = screen.context
        this.width = 80
        this.height = 200
        this.x = x - this.width/2
        this.y = y
        this.colisionAdjustHeight = 75
        this.colisionAdjustWidth = 27
        this.audio = new Audio('./assets/audio/sf_laser.mp3')
    }

    update(){
        this.y -= 10
        this.render()
    }

}

export default Shot