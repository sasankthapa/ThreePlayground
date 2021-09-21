import * as THREE from 'three';

export const createCube=()=>{
    const mesh=new THREE.Mesh(new THREE.BoxBufferGeometry(10,10,10),new THREE.MeshNormalMaterial());
    return mesh;
}
