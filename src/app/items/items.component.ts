import {Component, OnInit} from '@angular/core';
import {ItemModel} from "../Models/item.model";
import {LynxService} from "../Services/lynx.service";
import {LynxLoggingService} from "../Services/lynx-logging.service";
import {IItemColumn} from "../custom-components/lynx-table/Models/item.model";
import {CategoryModel} from "../Models/category.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  // Список элементов
  public items: ItemModel[];

  // Тип редактируемых элементов
  public itemTypeId: number = 1;
  public itemTypeName: string = 'Список товаров';
  public editUrlSegment: string = "item-edit";

  // Столбцы таблицы
  public itemsColumns: IItemColumn[];

  constructor(private lynxService: LynxService,
              private route: ActivatedRoute) {

    let urlSegment = "";

    this.route.url.subscribe(
      res => {
        urlSegment = res[0].path;
      },

      error => LynxLoggingService.Error(error)
    );

    switch (urlSegment) {
      case 'items':
        this.itemTypeId = 1;
        this.editUrlSegment = 'item-edit';
        this.itemTypeName = 'Список товаров';
        break;
      case 'pages':
        this.itemTypeId = 3;
        this.editUrlSegment = 'page-edit';
        this.itemTypeName = 'Список страниц';
        break;
      case 'news':
        this.itemTypeId = 2;
        this.editUrlSegment = 'news-edit';
        this.itemTypeName = 'Список новостей';
        break;
      default:
        this.itemTypeId = 1;
        this.editUrlSegment = 'item-edit';
        this.itemTypeName = 'Список товаров';
        break;
    }
  }

  /**
   * Получение списка товаров
   * @constructor
   */
  public GetItems(): void {
    this.lynxService.Post('/Items/GetItems?itemType=' + this.itemTypeId, {})
      .subscribe(
        res => {
          this.items = res.Result;

          LynxLoggingService.Log('Список товаров ', res.Result);
        }
      );
  }

  ngOnInit() {

    this.GetItems();

    // Параметры таблицы с товарами
    this.itemsColumns = [
      {
        header: 'ID',
        data: 'id'
      },
      {
        header: 'Название',
        data: 'title',
        template: {
          type: 'link',
          linkUrl: '/' + this.editUrlSegment,
          param: 'id'
        },
        styles: {
          'text-align': 'left'
        }
      },
      {
        header: 'Категория',
        data: 'CategoryTitle'
      },
      {
        header: 'Приоритет',
        data: 'Prioritet'
      },
      {
        header: 'Дата создания',
        data: 'DateCreating',
        pipe: 'date'
      },
      {
        header: 'Дата редактирования',
        data: 'DateEditing',
        pipe: 'date'
      },
    ];
  }

}
