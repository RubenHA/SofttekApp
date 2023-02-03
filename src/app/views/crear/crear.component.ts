import { Component, Input, OnInit } from '@angular/core';
import { VentaI } from 'src/app/models/venta.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  @Input() venta:VentaI;
  id: number = 0;
  producto: string = "";
  cliente: string = "";
  usuario: string = "";
  cantidad: number = 0;
  precio: number = 0;
  fecha: Date = new Date();

  datepipe: DatePipe = new DatePipe('en-US')

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.id = this.venta.id
    this.producto = this.venta.producto
    this.cliente = this.venta.cliente
    this.usuario = this.venta.usuario
    this.cantidad = this.venta.cantidad
    this.precio = this.venta.precio
    this.fecha = this.venta.fecha
  }

  registrarVenta(){
    if(this.producto == '' || this.cliente == '' || this.cantidad == 0 || this.precio == 0){
      Swal.fire(
        'Registrar venta',
        'Complete todo el formulario.',
        'warning'
      )
    }
    else{
      var venta = {
        id: this.id,
        producto: this.producto,
        cliente: this.cliente,
        usuario: 'UsuarioSofttek',
        cantidad: this.cantidad,
        precio: this.precio,
        fecha: new Date(this.datepipe.transform(new Date(), 'YYYY-MMM-dd'))
      }
      this.api.addVenta(venta).subscribe(res=>{
        var cerrarModalBtn = document.getElementById('crear-modal-cerrar');
        if(cerrarModalBtn){
          cerrarModalBtn.click();
        }
  
        Swal.fire(
          'Registrar venta',
          'Se registró la venta correctamente.',
          'success'
        )
      })
    }
  }

  actualizarVenta(){
    var venta = {
      id: this.id,
      producto: this.producto,
      cliente: this.cliente,
      usuario: this.usuario,
      cantidad: this.cantidad,
      precio: this.precio,
      fecha: new Date()
    }
    var id:number = this.id;
    this.api.updateVenta(id,venta).subscribe(res=>{
      var cerrarModalBtn = document.getElementById('crear-modal-cerrar');
      if(cerrarModalBtn){
        cerrarModalBtn.click();
      }

      Swal.fire(
        'Actualizar venta',
        'Se actualizó la venta correctamente.',
        'success'
      )
    })
  }

  cerrarModal(){
    var cerrarModalBtn = document.getElementById('crear-modal-cerrar');
      if(cerrarModalBtn){
        cerrarModalBtn.click();
      }
  }

}
