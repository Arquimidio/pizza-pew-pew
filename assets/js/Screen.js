class Screen{

    constructor(){
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.id = 'screen'
    }

    // Creates the canvas (why not JS canvas?)
    generate(){
        const container = document.getElementById('container')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.id = this.id
        this.makeResponsive()
        container.appendChild(this.canvas)
        return this
    }

    // Clears the screen (used to frame update)
    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    //Makes the entities responsive
    resize(){
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight 
    }

    // Wait, the guy above wasn't doing exactly this?
    makeResponsive(){
        window.addEventListener('resize', this.resize.bind(this))
    }

}

export default Screen