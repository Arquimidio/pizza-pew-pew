import Screen from "./Screen.js"
import Score from "./Score.js"
import Player from "./Player.js"
import Shot from "./Shot.js"
import Enemy from "./Enemy.js"
import Detector from "./Detector.js"

//PRAISE THE ONE WHO MAKES ALL THIS WEIRD GAME POSSIBLE
class Brain{
    
    // This boi here is Bob the constructor (Aka the great architect)
    // He gives the class all the characteristics it needs (something like artificial gene selection)
    constructor(){
        this.screen = false
        this.detector = new Detector()
        this.enemies = []
        this.player = false
        this.gameRunning = false
        this.shot = false
        this.score = false
        this.retry = document.getElementById('retry')
        this.updateSpeed = 15
        this.startSound = new Audio('./assets/audio/arcade.wav')
        this.music = new Audio('./assets/audio/music.mp3')
        this.music.loop = true
        this.menu = document.getElementById('start')
    }

    // ============= INITIALIZATION ======================

    //Starts the screen updating process (AKA lag generator / FPS)
    runScreenUpdate(){
        return setInterval(this.updateGameArea.bind(this), this.updateSpeed)
    }

    //I don't need to explain this, right?
    initializeSound(){
        this.startSound.play()
        this.music.play()
    }

    //Nor this
    initializeScreen(){
        this.screen = new Screen().generate()
        this.gameRunning = this.runScreenUpdate()
        this.menu.remove()
    }

    /*
        Ok, maybe this. This creates the enemies, player and the score at the start/restart of
        the game
    */
    initializeEntities(){
        this.score = new Score(this.screen).update()
        this.enemies = this.generateEnemies(1)
        this.player = new Player(this.screen, 150, 150, 'red').initializePosition().render()
    }

    // Adds all the necessary Smurfs for this to work (ok, not all of them, some are somewhere else)
    createListeners(){
        //Shot key event listener
        window.addEventListener('keypress', this.shoot.bind(this))
        //Score responsiveness listener
        window.addEventListener('resize', this.score.resize.bind(this))
        //Retry listener
        this.retry.addEventListener('click', this.resetGame.bind(this))
    }

    // I wonder what this does
    startGame(){
        this.initializeSound()
        this.initializeScreen()
        this.initializeEntities()
        this.createListeners()
    }

    // ==========  SHOOTING MECHANICS ===================
    
    // Callback function to the shooting event listener
    shoot(e){
        if(e.code === 'Space'){
            this.shot = new Shot(
                this.screen, 
                this.player.x + this.player.width/2, 
                this.player.y
               ).render()
            this.shot.audio.play()
        }
    }

    // Verifies if a projectile (no pineapple pizza) was shot and if it hit a target
    projectileShotAndHit(i){
        const enemy = this.enemies[i]
        return this.shot && this.detector.hit(this.shot, enemy)
    }

    /* 
       Handles the situation where an enemy was hit, clearing the projectile, 
       exploding the enemy, changing the score and removing the enemy from the screen
    */
    registerHit(enemy, i){
        this.shot = false
        enemy.explode()
        this.score.incrementScore()
        this.enemies.splice(i, 1)
    }

    // ===========  GAME STATE AND ENEMIES GENERATION MECHANICS  ================

    // Verifies if there are enemies alive
    allEnemiesDead(){
        return !this.enemies.length
    }

    // Creates enemies
    generateEnemies(speed){
        const enemies = Array.from({length: 25}, (e, i) => {
            return new Enemy(this.screen, i, 160, 180, 25 + 10*i, 100, 'blue', speed).render()
        })

        return enemies
    }

    // Verifies if the enemy crossed the Game Over Line
    enemyCrossedLine(i){
        return (this.enemies[i]) && 
               (this.enemies[i].y + this.enemies[i].height) >= 
               (this.player.y)
    }

    // Shows restart game menu
    showRetry(){
        this.retry.style.display = 'flex'
    }

    // Restarts the game after Game Over
    resetGame(){
        this.retry.style.display = 'none'
        this.enemies = [].concat(this.generateEnemies(1))
        this.score.points = 0
        this.score.turn = 0
        this.gameRunning = this.runScreenUpdate()
        this.shot = false
    }

    // Verifies and handles the Game Over Situation
    isGameOver(i){
        if(this.enemyCrossedLine(i)){
            this.music.pause()
            this.score.gameOver.play()
            clearInterval(this.gameRunning)
            this.showRetry()
        }
    }

    // Verifies the general situation of the enemies 
    //(if all dead, was hit or crossed game over line)
    verifyEnemiesSituation(){
        if(this.allEnemiesDead()){
            this.score.turn += 0.1
            this.enemies = this.enemies.concat(this.generateEnemies(this.score.turn))
        }

        for(let i = 0; i < this.enemies.length; i++){
            const enemy = this.enemies[i]
            if(this.projectileShotAndHit(i)){
                this.registerHit(enemy, i)
            }else{
                enemy.update()
            }

            this.isGameOver(i)
        }
    }

    // Updates all the game (this is what keeps the game running)
    updateGameArea(){
        this.screen.clear()
        this.verifyEnemiesSituation()
        this.player.update()
        this.score.update()
        if(this.shot){
            this.shot.update()
        }
    }    

}

// Event listener to the main menu play button
const play = document.getElementById('start-btn')
play.addEventListener('click', () => {
    new Brain().startGame()
})

