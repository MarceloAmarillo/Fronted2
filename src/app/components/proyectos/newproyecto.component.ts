import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-newproyecto',
  templateUrl: './newproyecto.component.html',
  styleUrls: ['./newproyecto.component.css']
})
export class NewproyectoComponent implements OnInit {
  nombreP: string = '';
  descripcionP: string = '';
  img: string= '';
  url: string= '';

  constructor(private sProyectos: ProyectosService, private router: Router, private activatedRouter: ActivatedRoute, public imageService: ImageService ) { }

  proyecto: Proyectos= null;

  ngOnInit(): void {
  }

  onCreate(): void {
    const proyecto = new Proyectos(this.nombreP, this.descripcionP, this.img, this.url);
    this.sProyectos.save(proyecto).subscribe(
      data => {
        alert("Proyecto añadido");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  uploadImage($event: any){
    const id= this.activatedRouter.snapshot.params['id'];
    const name= "proyecto_" + id;
    this.imageService.uploadImage($event, name);

  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyecto.img = this.imageService.url
    this.sProyectos.update(id, this.proyecto).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar la persona");
        this.router.navigate(['']);
      }
    )
  }

}