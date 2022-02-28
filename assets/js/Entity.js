// What is this boi? AN ABSTRACTION (angelical opera starts)
// It's just Player / Enemy father, used to keep the code DRY
class Entity{
    constructor(src){
        this.image = new Image()
        this.image.src = src
    }

    render(){
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height)
        return this
    }
}

export default Entity