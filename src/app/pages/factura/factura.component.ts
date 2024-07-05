import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxPrinterService } from 'ngx-printer';

// MODELS
import { Invoice } from 'src/app/models/invoices.model';

// SERVICES
import { InvoicesService } from 'src/app/services/invoices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(  private activatedRoute: ActivatedRoute,
                private invoicesService: InvoicesService,
                private printerService: NgxPrinterService) { 
    activatedRoute.params.subscribe( ({id}) =>{

      this.loadInvoice(id);
      
    })
  }

  ngOnInit(): void {  

  }

  /** ================================================================
   *  PRINT INVOICE
  ==================================================================== */
  @ViewChild('PrintTemplate') PrintTemplateTpl!: TemplateRef<any>;
  printTemplate() {
    this.printerService.printDiv('PrintTemplateTpl');
  }

  /** ================================================================
   *  LOAD INVOICE
  ==================================================================== */
  public invoice!: Invoice;
  loadInvoice(id: string){

    this.invoicesService.loadInvoiceId(id)
        .subscribe( ({invoice}) => {

          this.invoice = invoice;
          console.log(invoice);
          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /** ================================================================
   *  RETURN INVOICE
  ==================================================================== */
  returnInvoice( invoice: Invoice ){

    if (invoice.status) {
      Swal.fire({
        title: "Estas seguro?",
        text: "De cancelar esta factura!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, cancelar!"
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.invoicesService.returnInvoice( {status: false}, invoice.iid! )
          .subscribe( ({invoice}) => {

            this.invoice.status = invoice.status;

          }, (err) => {
            console.log(err);
            Swal.fire('Error', err.error.msg, 'error');            
          })

        }
      }); 
      
      

    }

  }

}
