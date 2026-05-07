import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { HDRLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current

    if (!mount) {
      return undefined
    }

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    // Camera controls
    const orbit = new OrbitControls(camera, renderer.domElement)
    orbit.enableZoom=false;
    orbit.enablePan=false;

    // Does not work if set to 0, 0, 0
    // 0.01 for first person
    camera.position.set(0, 0, 0.01);
    orbit.update();

    // Creating Background
    // Taking Texture and loading it onto sphere
    const Bgeometry = new THREE.SphereGeometry(1000, 60, 60);
    const BackTexture = new THREE.TextureLoader().load( './src/assets/back.jpg' );
    let Bmaterial = new THREE.MeshBasicMaterial( { map: BackTexture} );
    Bmaterial.side = THREE.BackSide;
    const Background = new THREE.Mesh( Bgeometry, Bmaterial );
    scene.add(Background);

    // Test Sprite
    // Creates base sprite to later make more
    const sprites = [];
    const map = new THREE.TextureLoader().load( './src/assets/testbird.png' );
    const material = new THREE.SpriteMaterial( { map: map, transparent: true} );
    const sprite = new THREE.Sprite( material );

    // Default plane to clone
    const planes = [];
    const planeGeo = new THREE.PlaneGeometry(10, 10);
    const planeMat = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.5});
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.scale.set(2.1,2.1,2.1);

    // Creating cube sides
    for (let i = 0; i < 6; i++)
    {
        planes[i] = plane.clone();
        scene.add(planes[i]);
    }


    // Box
    // Rotation is based on pi
    // 3.14 = 180° rotation
    planes[0].position.set(0, 10, 0);
    planes[0].rotation.set(1.57, 0, 0);

    planes[1].position.set(0, -10, 0);
    planes[1].rotation.set(-1.57, 0, 0);

    planes[2].position.set(0, 0, 10);
    planes[2].rotation.set(3.14, 0, 0);

    planes[3].position.set(0, 0, -10);
    planes[3].rotation.set(0, 0, 0);

    planes[4].position.set(10, 0, 0);
    planes[4].rotation.set(0, -1.57, 0);

    planes[5].position.set(-10, 0, 0);
    planes[5].rotation.set(0, 1.57, 0);

    // To keep track of mouse clicks
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const intersectionPoint = new THREE.Vector3();

    // Runs when the mouse moves
    // Gets its position in frame
    window.addEventListener('mousemove', function(e){
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        mouse.y = - ((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
    });

    // Fires a ray to mouse position
    // Then checks if it intersects anything
    // Can later be changed to detect specifically which object it intersected
    window.addEventListener('click', function() {

        raycaster.setFromCamera(mouse, camera);
        intersectionPoint.copy(raycaster.intersectObjects(planes)[0].point);

        // If the ray intersects with any of the objects in the list
        if (raycaster.intersectObjects(sprites).length > 0)
        {
            window.confirm('hello')
        }

    })

    // Creates objects and adds them to an array
    window.addEventListener('dblclick', function(){
        raycaster.setFromCamera(mouse, camera);
        intersectionPoint.copy(raycaster.intersectObjects(planes)[0].point);

        // Creates object,
        // Pushes into list
        // And sets its position to point clicked
        sprites.push(sprite.clone());
        scene.add(sprites[sprites.length - 1]);
        sprites[sprites.length - 1].position.copy(intersectionPoint);
    });


    // Rendering
    let animationFrameId

    const renderScene = () => {
      renderer.render(scene, camera)
      animationFrameId = window.requestAnimationFrame(renderScene)
    }

    const handleResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) {
        return
      }

      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('resize', handleResize)
    renderScene()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950" />
}

export default ThreeScene
