// Create the BabylonJS engine and scene
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

// Create a basic light
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

// Create a basic camera
var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Create a sphere
var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);
// sphereMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
// sphereMaterial.diffuseTexture = new BABYLON.Texture('./assets/img/model.png');

sphereMaterial.lightmapTexture = new BABYLON.Texture('./assets/img/model.png', scene);
sphereMaterial.useLightmapAsShadowmap = true;

var patternTexture = new BABYLON.Texture('./assets/img/circleTexture.png', scene);
patternTexture.hasAlpha = true; // Ensure the pattern has transparency
sphereMaterial.diffuseTexture = patternTexture;

sphere.material = sphereMaterial;

// Render loop
engine.runRenderLoop(function() {
    scene.render();
});

// Resize event
window.addEventListener("resize", function() {
    engine.resize();
});