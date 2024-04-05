import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  isSidePanelVisible: boolean = false;
  productObj: any = {
      "productId": 0,
      "productSku": "",
      "productName": "",
      "productPrice": 0, 
      "productShortName": "",
      "productDescription": "",
      "createdDate": new Date(),
      "deliveryTimeSpan": "",
      "categoryId": 0,
      "productImageUrl": ""
    }

    categoryList: any [] = [];
    productList: any [] = [];

  constructor(private productSvr: ProductService){

  }
  ngOnInit(): void {
    this.getAllCategory();
    this.getProducts();
  }

  getProducts(){
    this.productSvr.getAllProducts().subscribe((res: any) => {
      this.productList = res.data;
    });
  }

  getAllCategory(){
    this.productSvr.getAllCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    });
}

  onSave(){
    this.productSvr.saveProduct(this.productObj).subscribe((res:any) => {
      if(res.result){
        alert("Product Created")
        this.getProducts();
      } else{
        alert(res.message)
      }
    })
  }

  openSidePanel(){
    this.isSidePanelVisible = true;
  }

  closeSidePanel(){
    this.isSidePanelVisible = false;
  }

}
