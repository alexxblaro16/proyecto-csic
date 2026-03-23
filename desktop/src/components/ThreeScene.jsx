import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current

    if (!mount) {
      return undefined
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x020617)

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0.7, 3)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x67e8f9, 2)
    directionalLight.position.set(2, 3, 4)
    scene.add(directionalLight)

    const geometry = new THREE.BoxGeometry(1.1, 1.1, 1.1)
    const material = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      metalness: 0.2,
      roughness: 0.25,
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.03, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }),
    )
    ring.rotation.x = Math.PI / 2
    scene.add(ring)

    let animationFrameId

    const renderScene = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.014
      ring.rotation.z += 0.004
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
      geometry.dispose()
      material.dispose()
      ring.geometry.dispose()
      ring.material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950" />
}

export default ThreeScene
