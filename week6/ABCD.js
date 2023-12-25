let markerVisible = { A: false, B: false, C: false, D: false };

AFRAME.registerComponent('registerevents', {
  init: function () {
    let marker = this.el;
    marker.addEventListener('markerFound', function () {
      markerVisible[marker.id] = true;
    });
    marker.addEventListener('markerLost', function () {
      markerVisible[marker.id] = false;
    });
  }
});

AFRAME.registerComponent('run', {
  init: function () {
    this.A = document.querySelector("#A").object3D;
    this.B = document.querySelector("#B").object3D;
    this.C = document.querySelector("#C").object3D;
    this.D = document.querySelector("#D").object3D;
    
    this.pA = new THREE.Vector3();
    this.pB = new THREE.Vector3();
    this.pC = new THREE.Vector3();
    this.pD = new THREE.Vector3();

    this.createCylinderAndLine('AB', '#lineAB');
    this.createCylinderAndLine('BC', '#lineBC');
    this.createCylinderAndLine('CD', '#lineCD');
    this.createCylinderAndLine('DA', '#lineDA');
  },

  createCylinderAndLine: function (cylinderId, lineId) {
    let material = new THREE.MeshLambertMaterial({ color: 0X03fcad });
    let geometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 12);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));

    this['cylinder' + cylinderId] = new THREE.Mesh(geometry, material);
    this['line' + cylinderId] = document.querySelector(lineId).object3D;
    this['line' + cylinderId].add(this['cylinder' + cylinderId]);
    this['cylinder' + cylinderId].visible = false;
  },

  tick: function () {
    this.updateCylinder('AB', 'A', 'B');
    this.updateCylinder('BC', 'B', 'C');
    this.updateCylinder('CD', 'C', 'D');
    this.updateCylinder('DA', 'D', 'A');
  },

  updateCylinder: function (cylinderId, point1Id, point2Id) {
    if (this[point1Id] && this[point2Id]) {
      this[point1Id].getWorldPosition(this['p' + point1Id]);
      this[point2Id].getWorldPosition(this['p' + point2Id]);
      let distance = this['p' + point1Id].distanceTo(this['p' + point2Id]);

      this['line' + cylinderId].lookAt(this['p' + point2Id]);
      this['cylinder' + cylinderId].scale.set(1, 1, distance);
      this['cylinder' + cylinderId].visible = true;
    } else {
      this['cylinder' + cylinderId].visible = false;
    }
  }
});
