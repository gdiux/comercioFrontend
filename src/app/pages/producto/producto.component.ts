import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// MODELS
import { Product } from 'src/app/models/products.model';

// SERVICES
import { ProductsService } from '../../services/products.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { SubcategoriasService } from 'src/app/services/subcategorias.service';
import { Category } from 'src/app/models/category.model';
import { Subcategory } from 'src/app/models/subcategory.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ]
})
export class ProductoComponent implements OnInit {

  constructor(  private activatedRoute: ActivatedRoute,
                private productsService: ProductsService,
                private router: Router,
                private fb: FormBuilder,
                private categoriasService: CategoriasService,
                private subcategoriasService: SubcategoriasService) {}

  ngOnInit(): void {

    // LOAD CATEGORIES
    this.loadCategories();

    this.loadProduct();


  }

  /** ================================================================
   *   LOAD CATEGORIES
  ==================================================================== */
  public categories: Category[] = [];
  loadCategories(){

    this.categoriasService.loadCategories({desde: 0, hasta: 1000})
        .subscribe( ({categories}) => {
          this.categories = categories;
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /** ================================================================
   *   LOAD SUBCATEGORIES
  ==================================================================== */
  public subcategories: Subcategory[] = [];
  loadSubcategories(categoria: string){
    
    this.subcategoriasService.loadSubcategories({desde: 0, hasta: 1000, categoria})
      .subscribe( ({subcategories}) => {
          this.subcategories = subcategories;
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
      })
        
  }

  /** ================================================================
   *  LOAD PRODUCT ID
  ==================================================================== */
  public product: Product | any;
  public portada: string = 'none';

  loadProduct(){

    this.activatedRoute.params
        .subscribe( ({id}) =>  {      
        

          this.productsService.loadProductId(id)
              .subscribe( ({product}) => {

                console.log(product);
                

                this.product = product;

                if (product.img.length > 0) {
                  this.portada = this.product.img.img;
                }

                this.loadSubcategories(product.categoria.catid);

                this.updateForm.setValue({
                  sku: this.product.sku,
                  name: this.product.name,
                  type: this.product.type,
                  description: this.product.description,
                  price: this.product.price,
                  cost: this.product.cost,
                  min: this.product.min,
                  categoria: this.product.categoria._id || 'none',
                  subcategoria: this.product.subcategoria._id || 'none',
                  visibility: this.product.visibility
                })
                

              }, (err) => {
                Swal.fire('Error', err.error.msg, 'error');
                this.router.navigateByUrl('/');
                
              });

      });

  }

  /** ================================================================
   *  UPDATE PRODUCT
  ==================================================================== */
  public formSubmitted: boolean = false;
  public updateForm = this.fb.group({
    sku: ['', [Validators.required]],
    name: ['', [Validators.required]],
    type: 'Unidad',
    description: '',
    price: 0,
    cost: 0,
    min: 0,
    categoria: 'none',
    subcategoria: 'none',
    visibility: true
  })

  update(){

    this.formSubmitted = true;
    
    if (this.updateForm.invalid) {
      
      this.formSubmitted = false;
      return;
    }

    if (this.updateForm.value.categoria === 'none' || this.updateForm.value.categoria === '' ) {
      Swal.fire('Atención', 'debes de seleccionar una categoria', 'warning')
      return;
    }

    if (this.updateForm.value.subcategoria === 'none' || this.updateForm.value.subcategoria === '' ) {
      Swal.fire('Atención', 'debes de seleccionar una subcategoria', 'warning')
      return;
    }

    this.productsService.updateProduct( this.updateForm.value, this.product.pid! )
        .subscribe( ({product}) => {

          this.product = product;
          Swal.fire('Estupendo', 'El producto se ha actualizado exitosamente!', 'success');

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })


  }

  /** ================================================================
   *  VALIDATE FORM
  ==================================================================== */
  validate(campo: string): boolean{

    if (this.updateForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    }else{
      return false;
    }
  }

  /** ================================================================
   *  CHANGE STATUS
  ==================================================================== */
  changeStatus(status: boolean){

    if (status) {
      status = false;
    }else{
      status = true;      
    }

    this.productsService.updateProduct({sku: this.product.sku, status}, this.product.pid!)
        .subscribe( ({product}) => {

          this.product.status = product.status;
          Swal.fire('Estupendo', ' Se ha actualizdo el estado del producto exitosamente!', 'success');

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        })

  }

  
  // FIN DE LA CLASE
}
