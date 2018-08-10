import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SearchProduct, ClearProducts } from '../../store/actions/app.actions';
import { debounceTime, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Product } from '../../app.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public productText: string = ''
  public isLoading: boolean = false


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
  public searchForm: FormGroup;

  public searchInputClasses = {
    'input': true,
    'input--search': true,
    'input--error': false
  }

  constructor(private dataService: DataService, private fb: FormBuilder, private $store: Store) {
    this.keyUp.pipe(
      filter(value => value.length > 0),
      tap(() => {
        this.isLoading = true
        console.log(`Is Loading ${this.isLoading}`);

      }),
      debounceTime(1000), distinctUntilChanged(),
      map(
        (text: string): string[] => text.split(':')
      )
    )
      .subscribe(
        (values: string[]) => {
          setTimeout(() => this.isLoading = false, 1000)
          console.log(`Is loding ${this.isLoading}`);


          this.$store.dispatch(new SearchProduct(values))
        }
      )
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      text: ''
    })
    this.dataService.getCurrentPayState().subscribe((state: boolean) => {
      if (state)
        this.searchForm.controls['text'].setValue('')
      //   this.searchForm.reset()
      console.log(`PAYLOAD CURRENT STATE ${state}`);

    })
  }

  onChange($event: string) {
    this.keyUp.next($event)

  }
  onItemClick($event: string) {
    console.log(`CLICKED ${$event}`)
    this.$store.dispatch(new ClearProducts())
    this.searchForm.controls['text'].setValue($event + ':')
    // this.searchForm.controls['text'] = $event + ':'

    // this.productText = $event
  }
  hasError(): boolean {
    // let productLen: number = 0
    let hasError: boolean;
    this.products.subscribe(
      (value) => {
        hasError = value.length === 0 && this.searchForm.controls['text'].value.length > 0
        this.searchInputClasses['input--error'] = hasError
      }
    )
    return hasError
  }

}
