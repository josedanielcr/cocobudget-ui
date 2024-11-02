import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullProfileImage',
  standalone: true
})
export class NullProfileImagePipe implements PipeTransform {

  private readonly DEFAULT_IMAGE = 'assets/images/coconut.jpg';

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? value : this.DEFAULT_IMAGE;
  }

}
