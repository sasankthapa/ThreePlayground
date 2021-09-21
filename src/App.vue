<script setup>
import { onMounted } from '@vue/runtime-core';
import * as THREE from 'three';

const scene=new THREE.Scene();
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
let camera=null;
const light = new THREE.AmbientLight(0x000000,1);
const mesh=new THREE.Mesh(new THREE.BoxBufferGeometry(5,5,5),new THREE.MeshNormalMaterial());
const planeMesh=new THREE.Mesh(new THREE.PlaneBufferGeometry(5,5,10,10),new THREE.ShaderMaterial({
    vertexShader:`
    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
    `,
    fragmentShader:`
        void main(){
            gl_FragColor= vec4(1.0,1.0,0.0,1.0);
        }
    `
}));

mesh.position.x=0;
scene.add(light)
scene.add(mesh)
scene.add(planeMesh)

const animate=()=>{
    requestAnimationFrame(animate);
    mesh.rotation.x-=0.01;
    mesh.rotation.z+=0.02;
    renderer.render(scene,camera)
}

onMounted(()=>{
    const container=document.getElementById('container');
    camera=new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,1000)
    camera.position.z=10;
    camera.lookAt(0,0,0);
    scene.add(camera);
    container.appendChild(renderer.domElement);
    animate();
})

defineExpose({camera})
</script>

<template>
    <div id="container">
    </div>
</template>

<style>
*{
    padding:0;
    margin:0;
    box-sizing: border-box;
}

canvas{
    position: absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
}
</style>
