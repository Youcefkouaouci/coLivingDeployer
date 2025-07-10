import { inject, Injectable } from '@angular/core';
import { Announcement } from '../models/annoncement.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  url = 'https://atelier-de-toril.fr/api/announcements';

  private httpClient = inject(HttpClient);

  getAll(): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(this.url, {
      headers: {
        accept: 'application/json',
      },
    });
  }

  getById(id: Number) {}
  params: string[] = [];

  getFilteredAnnouncement(
    filters: Record<string, string>
  ): Observable<Announcement[]> {
    const params: Record<string, string> = {};
    // {...params...}

    // Nettoyage et construction manuelle de l'objet params
    if (
      filters['city'] &&
      typeof filters['city'] === 'string' &&
      filters['city'].trim()
    ) {
      params['city'] = filters['city'].trim();
    }

    if (Number(filters['priceMax']) && Number(filters['priceMax']) > 0) {
      params['dailyPrice[lte]'] = Number(filters['priceMax']).toString();
    }

    if (Number(filters['guests']) && Number(filters['guests']) > 0) {
      params['maxClient[gte]'] = Number(filters['guests']).toString();
    }

    // Génération de la query string à partir de l'objet Record
    const query = new URLSearchParams(params).toString();
    const url = `${this.url}?${query}`;

    return this.httpClient.get<Announcement[]>(url, {
      headers: {
        accept: 'application/json',
      },
      params,
    });
  }
}
