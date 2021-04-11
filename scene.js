var scene, renderer, camera;
var cube;
var controls;

var group = new THREE.Group(); //group of spheres

init();
animate();

function init()
{
    // Renderer setup
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize (width, height);
    document.body.appendChild (renderer.domElement);

    // Creating a scene
    scene = new THREE.Scene();

    // #Adding our Geometry    
    // Spheres
    draw_sphere (1, 1, 2, 0);
    draw_sphere (1, 2, 3, 1);
    draw_sphere (1, 3, 2, 1);
    draw_sphere (1, -2, 2, 2);
    draw_sphere (1, 3, 2, 2);
    scene.add(group);
    // Grids/Planes
    const plane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );
	const helper = new THREE.PlaneHelper( plane, 10, 0xffff00 );
	scene.add( helper );
    const plane2 = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), -1 );
	const helper2 = new THREE.PlaneHelper( plane2, 10, 0xff00ff );
	scene.add( helper2 );
    const plane3 = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), -2 );
	const helper3 = new THREE.PlaneHelper( plane3, 10, 0x00ffff );
	scene.add( helper3 );
    //var gridXZ = new THREE.PlaneHelper(new THREE.Vector3( 1, 1, 0.2 ), 3);
    //scene.add(gridXZ);

    // Directing the Camera where to look
    camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
    //camera.position.x = 1;
    camera.position.y = 10;
    camera.position.z = 15;
    camera.lookAt (new THREE.Vector3(0,0,0));

    // Adding our Orbital Controller
    controls = new THREE.OrbitControls (camera, renderer.domElement);
}

function animate()
{
    controls.update();
    requestAnimationFrame ( animate );  
    renderer.render (scene, camera);
}

function draw_sphere(r, x, y, z) {
	
	const geometry = new THREE.SphereGeometry(r, 36, 36);
	const material = new THREE.MeshNormalMaterial( { transparent: true, opacity: .75 } );
	const sphere = new THREE.Mesh( geometry, material );

	//sphere.position.set (x,y,z);
	sphere.position.set (x/r,y/x,z/r);
	
	group.add(sphere);

	return sphere;
}
// (1,2,0), (2,3,1) (3,2,1), (-2,2 2), (3,2,2)