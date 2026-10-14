// demo shapes



import * as THREE from 'three';
import { log } from './logger.js';



// heart ♡
const shapeHeart = {rotate:false, stretch:false, speed:1, weight:1, avoidEdges:true, points:[]};
for (let i = 0; i < 30; i++){
    if (i==13 || i==17) continue; // indices to skip for nicer shape flow
    const t = (i / 30) * Math.PI * 2;
    const rawX = 16 * Math.pow(Math.sin(t), 3);
    const rawY = 10 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const x = rawX / 22;
    const y = rawY / 23;
    shapeHeart.points.push(new THREE.Vector2(x, y));
}
let minYIndex = 0;
for (let i = 1; i < shapeHeart.points.length; i++){ // find lowest point, make that the start of the curve (don't start at the top)
    if (shapeHeart.points[i].y < shapeHeart.points[minYIndex].y){
        minYIndex = i;
    }
}
shapeHeart.points = shapeHeart.points.slice(minYIndex).concat(shapeHeart.points.slice(0, minYIndex));
shapeHeart.points.push(shapeHeart.points[0]); // add first point on end to close



// squiggly 〰
const shapeSquiggly = {rotate:true, stretch:true, speed:1, weight:1, avoidEdges:false, points:[]};
for (let i = 0; i < 30; i++){
    const x = (i-(30/2))*.12; // centered
    const y = Math.sin(i*.8) * .4;
    shapeSquiggly.points.push(new THREE.Vector2(x, y));
}



// star ☆
const shapeStar = {rotate:false, stretch:false, speed:1, weight:1, avoidEdges:true, points:[
    new THREE.Vector2(0.0, 0.785),
    new THREE.Vector2(.176, .244),
    new THREE.Vector2(.747, .243),
    new THREE.Vector2(.287, -.091),
    new THREE.Vector2(.462, -.634),
    new THREE.Vector2(0, -.3),
    new THREE.Vector2(-.46, -.634),
    new THREE.Vector2(-.287, -.091),
    new THREE.Vector2(-.747, .243),
    new THREE.Vector2(-.176, .243),
    new THREE.Vector2(0.0, 0.785)
]};



// swirl 𖦹
const shapeSwirl = {rotate:true, stretch:false, speed:1, weight:1, avoidEdges:true, points:[]};
for (let i = 0; i < 30; i++){
    const t = i/30 * 1.1;
    const angle = 19 * t;
    const x = t * Math.cos(angle);
    const y = t * Math.sin(angle);
    shapeSwirl.points.push(new THREE.Vector2(x, y));
}



export { shapeHeart, shapeSquiggly, shapeStar, shapeSwirl };