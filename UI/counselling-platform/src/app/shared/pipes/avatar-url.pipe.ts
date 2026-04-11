import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const API_ORIGIN = environment.apiBaseUrl.replace(/\/api$/, '');

/** Resolves a relative avatar URL (/uploads/...) to a full URL using the API origin. */
@Pipe({ name: 'avatarUrl', standalone: true, pure: true })
export class AvatarUrlPipe implements PipeTransform {
  transform(value: string | null | undefined): string | null {
    if (!value) return null;
    if (value.startsWith('http')) return value;
    return `${API_ORIGIN}${value}`;
  }
}
