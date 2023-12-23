let markerVisible = {
	A: false,
	B: false,
	C: false,
	D: false,
	F: false,
	G: false,
};

AFRAME.registerComponent("registerevents", {
	init: function () {
		var marker = this.el;
		marker.addEventListener("markerFound", function () {
			console.log("Знайдено ", marker.id);
			markerVisible[marker.id] = true;
		});
		marker.addEventListener("markerLost", function () {
			console.log("Втрачено ", marker.id);
			markerVisible[marker.id] = false;
		});
	},
});

AFRAME.registerComponent("run", {
	init: function () {
		this.AB = document.getElementById("AB").object3D;
		this.BC = document.getElementById("BC").object3D;
		this.CD = document.getElementById("CD").object3D;
		this.DF = document.getElementById("DF").object3D;
		this.FG = document.getElementById("FG").object3D;
		this.GA = document.getElementById("GA").object3D;
		this.A = document.getElementById("A").object3D;
		this.B = document.getElementById("B").object3D;
		this.C = document.getElementById("C").object3D;
		this.D = document.getElementById("D").object3D;
		this.F = document.getElementById("F").object3D;
		this.G = document.getElementById("G").object3D;
		this.vecA = new THREE.Vector3();
		this.vecB = new THREE.Vector3();
		this.vecC = new THREE.Vector3();
		this.vecD = new THREE.Vector3();
		this.vecF = new THREE.Vector3();
		this.vecG = new THREE.Vector3();
	},
	tick: function () {
		this.A.getWorldPosition(this.vecA);
		this.B.getWorldPosition(this.vecB);
		this.C.getWorldPosition(this.vecC);
		this.D.getWorldPosition(this.vecD);
		this.F.getWorldPosition(this.vecF);
		this.G.getWorldPosition(this.vecG);

		if (markerVisible["A"] && markerVisible["B"]) {
			let distance = this.vecA.distanceTo(this.vecB);
			console.log("AB = ", distance);
			this.AB.visible = true;
			this.AB.scale.set(1, distance, 1);
			this.AB.position.set(0, 0, 0);
			this.AB.lookAt(this.vecB);
		}
		if (markerVisible["B"] && markerVisible["C"]) this.BC.visible = true;
		if (markerVisible["C"] && markerVisible["D"]) this.CD.visible = true;
		if (markerVisible["D"] && markerVisible["F"]) this.DF.visible = true;
		if (markerVisible["F"] && markerVisible["G"]) this.FG.visible = true;
		if (markerVisible["G"] && markerVisible["A"]) this.GA.visible = true;
		if (!markerVisible["A"]) this.AB.visible = this.GA.visible = false;
		if (!markerVisible["B"]) this.AB.visible = this.BC.visible = false;
		if (!markerVisible["C"]) this.BC.visible = this.CD.visible = false;
		if (!markerVisible["D"]) this.CD.visible = this.DF.visible = false;
		if (!markerVisible["F"]) this.DF.visible = this.FG.visible = false;
		if (!markerVisible["G"]) this.FG.visible = this.GA.visible = false;
	},
});
