import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    // Convertir URLs de YouTube a formato embed
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = this.extractVideoId(url);
      url = `https://www.youtube.com/embed/${videoId}?autoplay=0&loop=1`;
    } else if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1];
      url = `https://player.vimeo.com/video/${videoId}?autoplay=0&loop=1`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private extractVideoId(url: string): string {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }
}
