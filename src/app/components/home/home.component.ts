import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AnnouncementService } from '../../services/announcement.service';
import { Announcement } from '../../models/annoncement.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private announcementservice: AnnouncementService =
    inject(AnnouncementService);

  title: string = 'Mes Annonces';
  announcements: Announcement[] = [];

  selectedAnnouncement: Announcement | null = null;

  ngOnInit(): void {
    this.announcementservice.getAll().subscribe({
      next: (data) => {
        this.announcements = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des annonces:', error);
      },
    });
  }

  searchAnnouncements(filters: any) {
    this.announcementservice.getFilteredAnnouncement(filters).subscribe({
      next: (data) => {
        this.announcements = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des annonces :', err);
      },
    });
    // console.log(filters);
  }

  trackById(index: number, announcement: Announcement): number {
    return announcement.id;
  }

  selectAnnouncement(announcement: Announcement): void {
    this.selectedAnnouncement = announcement;
  }

  closeModal(): void {
    this.selectedAnnouncement = null;
  }
}
