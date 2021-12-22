import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";

import { ObjectInterface } from '../../interfaces/object';

@Component({
  selector: 'app-model-item',
  templateUrl: './model-item.component.html',
  styleUrls: ['./model-item.component.css']
})
export class ModelItemComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  @Input() public item: ObjectInterface;
  @Input() public color: string;
  @Input() public width: number;
  @Input() public height: number;
  @Input() public depth: number;
  @Input() public control?: Boolean = true;
  @Input() public automation?: Boolean = false;

  private rotationSpeedX: number = 0.05;
  private rotationSpeedY: number = 0.01;

  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private geometry: THREE.BoxGeometry;
  private material: THREE.MeshBasicMaterial;
  private cube: THREE.Mesh;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  constructor() { }

  ngOnInit(): void {
    this.loadItem();
  }
  ngOnChanges(): void {
    this.loadItem();
    if(this.canvasRef) {
      this.createScene();
      this.startRenderingLoop();
    }
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }


  private createScene() {
    //* Scene
    if(this.cube) {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xffffff)
      this.scene.add(this.cube);
      //*Camera
      let aspectRatio = this.getAspectRatio();
      this.camera = new THREE.PerspectiveCamera(
        1,
        aspectRatio,
        1,
        1000
      )
      this.camera.position.z = 400;
    }
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ModelItemComponent = this;
    if(this.automation) {
      (function render() {
        requestAnimationFrame(render);
        component.animateCube();
        component.renderer.render(component.scene, component.camera);
      }());
    } else {
      (function render() {
        requestAnimationFrame(render);
        component.renderer.render(component.scene, component.camera);
      }());
    }
    
  }

  loadItem() {
    this.material = new THREE.MeshBasicMaterial({ color: this.item.color });
    this.geometry = new THREE.BoxGeometry(this.item.width || 1, this.item.height || 1, this.item.depth || 1);
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.cube.rotation.x = 1;
    this.cube.rotation.y = 0;
    this.cube.rotation.z = 1;

  }

}
