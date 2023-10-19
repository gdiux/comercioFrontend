import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoices.model';

// SERVICES
import { InvoicesService } from 'src/app/services/invoices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  constructor(  private invoicesService: InvoicesService) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  /** ================================================================
   *  LOAD INVOICE
  ==================================================================== */
  public invoices: Invoice[] = [];
  public query = {
    desde: 0,
    hasta: 50,
    status: true,
    sort: {
      'fecha': -1
    }
  }

  loadInvoices(){

    this.invoicesService.loadInvoices(this.query)
        .subscribe( ({invoices}) => {

          this.invoices = invoices;
          console.log(invoices);
          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg);
          
        })

  }

}
