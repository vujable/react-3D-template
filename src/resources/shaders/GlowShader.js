import * as THREE from 'three/src/Three';


var GlowShader = {
    uniforms: {
        c: {
            type: 'f',
            value: 1
        },
        p: {
            type: 'f',
            value: 8
        },
        glowColor: {
            type: 'c',
            value: new THREE.Color(0x0087ff)
        },
        viewVector: {
            type: 'v3',
            value: new THREE.Vector3(0,0,7)
        }
    },
    vertexShader: `
uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() {
  vec3 vNormal = normalize( normalMatrix * normal );
  vec3 vNormel = normalize( normalMatrix * viewVector );
  intensity = pow( c - dot(vNormal, vNormel), p );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
    fragmentShader: `
uniform vec3 glowColor;
varying float intensity;
void main() 
{
  vec3 glow = glowColor * intensity;
  gl_FragColor = vec4( glow, 1.0 );
}`,

    transparent: true
};

export { GlowShader };
