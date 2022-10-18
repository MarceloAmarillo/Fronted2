import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-editproyecto',
  templateUrl: './editproyecto.component.html',
  styleUrls: ['./editproyecto.component.css']
})
export class EditproyectoComponent implements OnInit {
  proyecto: Proyectos= null;
  constructor(private sProyectos: ProyectosService, private activatedRouter: ActivatedRoute, private router: Router, public imageService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sProyectos.detail(id).subscribe(data =>{this.proyecto = data;}, err =>{
        alert("Error al modificar el proyecto");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.sProyectos.update(id,this.proyecto).subscribe(data =>{this.router.navigate(['']);}, err =>{
         alert("Error al modificar el proyecto");
         this.router.navigate(['']);
      }
    )
  }
  uploadImage($event: any){
    const id= this.activatedRouter.snapshot.params['id'];
    const name= "proyecto_" + id;
    this.imageService.uploadImage($event, name);

  }
}
