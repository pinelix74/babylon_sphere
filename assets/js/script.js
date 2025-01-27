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

sphereMaterial.diffuseTexture = new BABYLON.Texture('./assets/img/model.png');

document.getElementById("baseTexture").addEventListener("change", function(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(fileEvent) {
            var baseTexture = new BABYLON.Texture(fileEvent.target.result, scene);
            sphereMaterial.diffuseTexture = baseTexture;
        };
        reader.readAsDataURL(file);
    }
});

var overlayTexture = new BABYLON.Texture('./assets/img/circleTexture.png', scene);
overlayTexture.hasAlpha = true;
sphereMaterial.emissiveTexture  = overlayTexture;

document.getElementById("overlayTexture").addEventListener("change", function(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(fileEvent) {
            overlayTexture = new BABYLON.Texture(fileEvent.target.result, scene);
            overlayTexture.hasAlpha = true;
            sphereMaterial.emissiveTexture = overlayTexture;
        };
        reader.readAsDataURL(file);
    }
});

sphereMaterial.emissiveColor  = BABYLON.Color3.FromHexString('#800080');

document.getElementById("tintColor").addEventListener("input", function(event) {
    var tintColor = event.target.value;
    sphereMaterial.emissiveColor = BABYLON.Color3.FromHexString(tintColor); // Applies tint color to the pattern overlay
});

document.getElementById("lightmapTexture").addEventListener("change", function(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(fileEvent) {
            var lightmapTexture = new BABYLON.Texture(fileEvent.target.result, scene);
            sphereMaterial.lightmapTexture = lightmapTexture;
            sphereMaterial.useLightmapAsShadowmap = true;
        };
        reader.readAsDataURL(file);
    }
});

sphere.material = sphereMaterial;

engine.runRenderLoop(function() {
    scene.render();
});

// Resize event
window.addEventListener("resize", function() {
    engine.resize();
});