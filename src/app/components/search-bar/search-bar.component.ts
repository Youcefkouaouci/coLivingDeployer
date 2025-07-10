import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  city: string = '';
  priceMax: number | null = null;
  guests: number | null = null;

  @Output() searchEvent = new EventEmitter<any>();

  onSearch(): void {
    this.searchEvent.emit({
      city: this.city?.trim() || '',
      priceMax: this.priceMax,
      guests: this.guests,
    });
  }

  resetFilters(): void {
    this.city = '';
    this.priceMax = null;
    this.guests = null;

    this.searchEvent.emit({
      city: '',
      priceMax: null,
      guests: null,
    });
  }
}
