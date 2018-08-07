import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SearchProduct, ClearProducts } from '../../store/actions/app.actions';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Product } from '../../app.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public productText: string = ''

  public categories = [
    {
      name: 'Juguetes',
      image: '../../../../assets/teddy.jpg',
      color: "blue"
    },
    {
      name: 'Audio',
      image: '../../../../assets/audio.png',
      color: "blue"
    },
    {
      name: `Computadoras`,
      image: '../../../../assets/laptop.jpg',
      color: "blue"

    },
    {
      name: 'Cables',
      image: '../../../../assets/wire.png',
      color: "blue"

    },
    {
      name: 'Otros',
      image: '../../../../assets/planet.jpg',
      color: "blue"

    },

  ]
  @Select(state => state.app.products) products: Observable<Product[]>

  private keyUp: Subject<string> = new Subject()

  public searchInputClasses = {
    'input': true,
    'input--search': true,
    'input--error': false
  }

  constructor(private $store: Store) {
    this.keyUp.pipe(
      filter(value => value.length > 0),
      debounceTime(1000), distinctUntilChanged(),
      map(
        (text: string): string[] => text.split(':')
      )
    )
      .subscribe(
        (values: string[]) => {
          this.$store.dispatch(new SearchProduct(values))
        }
      )
  }

  ngOnInit() {

  }

  onChange($event: string) {
    this.keyUp.next($event)

  }
  onItemClick($event: string) {
    console.log(`CLICKED ${$event}`)
    this.$store.dispatch(new ClearProducts())
    this.productText = $event + ':'

    // this.productText = $event
  }
  hasError(): boolean {
    let productLen: number = 0

    this.products.subscribe(
      (value) => {
        productLen = value.length
      }
    )
    const hasError = productLen === 0 && this.productText.length > 0
    this.searchInputClasses['input--error'] = hasError
    return hasError
  }

}
