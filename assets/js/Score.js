class Score{
    constructor(screen){
        this.context = screen.context
        this.turn = 1
        this.points = 0
        this.x = 50
        this.y = 100
        this.gameOver = new Audio('./assets/audio/laugh.mp3')
    }

    update(){
        this.context.fillText(`${this.points.toString().padStart(5, 0), this.x, this.y)} Microleons` ;
        this.context.font = "80px sans-serif";
        this.context.fillStyle = "Yellow"
        return this
    }

    resize(){
        this.x = 50
        this.y = window.innerHeight - 50
    }
    
    // This is where the psychology resides
    incrementScore(){
        this.points += 10
    }
}

export default Score
