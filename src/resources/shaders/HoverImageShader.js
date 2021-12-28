/**
 * @author TheFrost / https://codepen.io/frost084/full/OKZNRm
 */

 var HoverImageShader = {
    vertexShader: `
      varying vec2 vUv; 
  
      void main() {
        vUv = uv;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float; 
  
      uniform sampler2D txt;
      uniform float imageAspectRatio;
      uniform float aspectRatio;
      uniform float opacity;
      uniform float hover;
      varying vec2 vUv;
  
      float exponentialInOut(float t) {
        return t == 0.0 || t == 1.0 
          ? t 
          : t < 0.5
            ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
            : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
      } 
  
      void main() {
        vec2 uv = vUv;
  
        // fix aspectRatio
        float u = imageAspectRatio/aspectRatio;
        if(imageAspectRatio > aspectRatio) {
          u = 1. / u;
        }
  
        uv.y *= u;
        uv.y -= (u)/2.-.5;
  
        // hover effect
        float zoomLevel = .2;
        float hoverLevel = exponentialInOut(min(1., (distance(vec2(.5), uv) * hover) + hover));
        uv *= 1. - zoomLevel * hoverLevel;
        uv += zoomLevel / 2. * hoverLevel;
        uv = clamp(uv, 0., 1.);
        vec4 color = texture2D(txt, uv);
        if(hoverLevel > 0.) {
          hoverLevel = 1.-abs(hoverLevel-.5)*2.;
          //Pixel displace
          uv.y += color.r * hoverLevel * .05;
          color = texture2D(txt, uv);
          // RGBshift
          color.r = texture2D(txt, uv+(hoverLevel)*0.01).r;
          color.g = texture2D(txt, uv-(hoverLevel)*0.01).g;
        }
  
        gl_FragColor = mix(vec4(0.,0.,0.,opacity), color, opacity);
      }
    `,
    uniforms: {
      txt: {
        type: 't',
        value: ''
      },
      imageAspectRatio: {
        type: 'f',
        value: 1.0
      },
      aspectRatio: {
        type: 'f',
        value: 1.0
      },
      opacity: {
        type: 'f',
        value: 1.0
      },
      hover: {
        type: 'f',
        value: 0.0
      }
    }
  }
  
  export { HoverImageShader }
  