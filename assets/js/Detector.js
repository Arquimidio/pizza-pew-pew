class Detector{

    /* 
        Collision detection functionality
        Ok, this looks way worse than it is. It basically sees everythings
        as a square and verifies, corner by corner, side by side, if the elements
        me (not me me, but me the element) and the other element have collided.
    */
    hit(me, otherElement){
        const myLeft = me.x
        const myRight = me.x + me.width
        const myTop = me.y
        const myBottom = me.y + me.width
        const otherLeft = otherElement.x + me.colisionAdjustWidth
        const otherRight = otherElement.x + otherElement.width - me.colisionAdjustWidth
        const otherTop = otherElement.y + me.colisionAdjustHeight
        const otherBottom = otherElement.y + otherElement.height - me.colisionAdjustHeight
        let gotHit = true
        // This verifies if the collision happened (if one element touched the other)
        if(
            (myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myLeft > otherRight) ||
            (myRight < otherLeft)
        ){
            gotHit = false
        }
        return gotHit
    }

}

export default Detector
