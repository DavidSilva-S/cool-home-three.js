import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

//Scene
const scene = new THREE.Scene()

//Create a sphere geometry
const geometry = new THREE.SphereGeometry(3, 32, 16)
const material = new THREE.MeshStandardMaterial({color: '#ffa500', shininess: 1, roughness: 0.2 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Ligh
const light = new THREE.PointLight(0xffffff, 1, 120)
light.position.set(10, 10, 10)
light.intensity = 1.2

scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 20

//Renderer
const canvas = document.querySelector(".webgl-canvas")
const renderer = new THREE.WebGL1Renderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 2

//Resize the screen
window.addEventListener('resize', () => {
  //Updata the sizes
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight
  console.log(sizes.width, sizes.height);
  
  //Update the camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  // mesh.position.x += 0.1
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

const gsapAnimation = gsap.timeline({defaults: {duration: 1}})
gsapAnimation.fromTo( mesh.scale,{z:0, x: 0, y:0},{z:1, x:1, y:1})
gsapAnimation.fromTo( "h1",{y:"-100%"},{y:"0%"})