// additional demo shapes, on top of Sparkle Mouse built-in :)

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const shapeWilly = {rotate:false, stretch:false, speed:1.5, weight:.5, avoidEdges:true, points:[
    new Vector2(0.0, -0.3),
    new Vector2(.1, -0.45),
    new Vector2(.2, -0.5),
    new Vector2(.3, -0.48),
    new Vector2(.4, -0.45),
    new Vector2(.48, -0.35),
    new Vector2(.5, -0.25),
    new Vector2(.45, -0.1),
    new Vector2(.35, -0.025),
    new Vector2(.21, 0.0),
    new Vector2(.21, 0.2),
    new Vector2(.21, 0.4),
    new Vector2(.21, 0.6),
    new Vector2(.14, 0.82),
    new Vector2(.04, 0.96),
    // new Vector2(0.0, 0.98),
]}
const shapeWillyPointCount = shapeWilly.points.length;
for (let i = 0; i < shapeWillyPointCount; i++){ // adjust sizing first
    shapeWilly.points[i].x *= 1.5;
}
for (let i = 0; i < shapeWillyPointCount; i++){ // horizontally symmetrical
    shapeWilly.points.push(new Vector2(-shapeWilly.points[shapeWillyPointCount-i-1].x, shapeWilly.points[shapeWillyPointCount-i-1].y));
}

export { shapeWilly };