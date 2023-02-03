import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VentaI } from 'src/app/models/venta.interface';
import { ApiService } from 'src/app/services/api/api.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  ventaList!:Observable<VentaI[]>;
  venta: VentaI;
  modalTitle:string = '';
  activateCrearModal:boolean = false;

  constructor(
    private api: ApiService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.checkLocalStorage();
    this.ventaList = this.api.getVentasAll();
  }

  checkLocalStorage(){
    if(!localStorage.getItem('token')){
      this.router.navigate(['']);
    }
  }

  modalCrear(){
    this.venta = {
      id: 0,
      producto: "",
      cliente: "",
      usuario: "",
      cantidad: 0,
      precio: 0,
      fecha: new Date()
    }
    this.modalTitle = "Nueva Venta";
    this.activateCrearModal = true;
  }

  modalEditar(venta: VentaI){
    this.venta = venta;
    this.modalTitle = "Editar Venta";
    this.activateCrearModal = true;
  }

  modalCerrar(){
    this.activateCrearModal = false;
    this.ventaList = this.api.getVentasAll();
  }

  eliminar(venta: VentaI){
    Swal.fire({
      title: '¿Está seguro de eliminar esta venta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.api.deleteVenta(venta.id).subscribe(res=>{
        var cerrarModalBtn = document.getElementById('crear-modal-cerrar');
        if(cerrarModalBtn){
          cerrarModalBtn.click();
        }
        
        Swal.fire(
          'Eliminar venta',
          'Se eliminó la venta correctamente.',
          'success'
        )
        
        this.ventaList = this.api.getVentasAll();
      })
      }
    })
  }
}
