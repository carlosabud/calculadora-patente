import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  alicuota: string = '';
  yearlyAmount: number = 0;
  bimonthlyAmount: number = 0;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();

    this.calculatorForm.get('price').valueChanges.subscribe((price: number) => {
      this.yearlyAmount = this.calculateAmount(price);
      this.bimonthlyAmount = Number((this.yearlyAmount / 6).toFixed(2));
    });
  }

  buildForm() {
    this.calculatorForm = this.fb.group({
      price: [null, Validators.required],
    });
  }

  calculateAmount(price: number) {
    if (!price) {
      this.alicuota = '';
      return null;
    }
    if (price <= 580000) {
      this.alicuota = '3.2%';
      return price * 0.032;
    } else if (price > 580000 && price <= 800000) {
      this.alicuota = '4%';
      return price * 0.4;
    } else if (price > 800000 && price <= 1190000) {
      this.alicuota = '4.5%';
      return price * 0.045;
    } else if (price > 1190000) {
      this.alicuota = '5%';
      return price * 0.05;
    }
  }
}

// Si la valuación fiscal es menor o igual a 580.000 pesos, la alícuota es del 3,20%.
// Si la valuación fiscal es mayor a 580.000 pesos y hasta 800.000 pesos, la alícuota es de 4,00%.
// Si la valuación fiscal es mayor a 800.000 pesos y hasta 1.190.000 pesos, la alícuota es de 4,50%.
// Si la valuación fiscal es mayor a 1.190.000 pesos, la alícuota es de 5,00%.
