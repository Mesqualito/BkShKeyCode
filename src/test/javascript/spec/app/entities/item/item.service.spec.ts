import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ItemService } from 'app/entities/item/item.service';
import { IItem, Item } from 'app/shared/model/item.model';

describe('Service Tests', () => {
  describe('Item Service', () => {
    let injector: TestBed;
    let service: ItemService;
    let httpMock: HttpTestingController;
    let elemDefault: IItem;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ItemService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Item(
        0,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        false,
        false,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            modificationDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Item', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            modificationDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            timestamp: currentDate,
            modificationDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Item(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Item', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            modificationDate: currentDate.format(DATE_TIME_FORMAT),
            no: 'BBBBBB',
            no2: 'BBBBBB',
            name: 'BBBBBB',
            buom: 'BBBBBB',
            unitPrice: 1,
            netWeight: 1,
            hsNo: 'BBBBBB',
            hsDescription: 'BBBBBB',
            hsComment: 'BBBBBB',
            isBlocked: true,
            suom: 'BBBBBB',
            itemCategoryCode: 'BBBBBB',
            productGroupCode: 'BBBBBB',
            wsCategory3Code: 'BBBBBB',
            isGTIN: true,
            isOnlySpareparts: true,
            isUsedForWebshop: true,
            applicationKind: 'BBBBBB',
            strapType: 'BBBBBB',
            sealType: 'BBBBBB',
            driveType: 'BBBBBB',
            strapTensionMax: 1,
            strapWidth: 'BBBBBB',
            strappingsPerDay: 1,
            akkuType: 'BBBBBB',
            akkuBrand: 'BBBBBB',
            akkuCapacitiy: 1,
            akkuVoltage: 1,
            sealFixity: 1,
            speed: 1,
            motors: 1,
            strapThicknessMin: 1,
            strapThicknessMax: 1,
            isInProductFinder: true,
            isFullyAutomaticTension: true,
            isWeldingByButton: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timestamp: currentDate,
            modificationDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Item', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            modificationDate: currentDate.format(DATE_TIME_FORMAT),
            no: 'BBBBBB',
            no2: 'BBBBBB',
            name: 'BBBBBB',
            buom: 'BBBBBB',
            unitPrice: 1,
            netWeight: 1,
            hsNo: 'BBBBBB',
            hsDescription: 'BBBBBB',
            hsComment: 'BBBBBB',
            isBlocked: true,
            suom: 'BBBBBB',
            itemCategoryCode: 'BBBBBB',
            productGroupCode: 'BBBBBB',
            wsCategory3Code: 'BBBBBB',
            isGTIN: true,
            isOnlySpareparts: true,
            isUsedForWebshop: true,
            applicationKind: 'BBBBBB',
            strapType: 'BBBBBB',
            sealType: 'BBBBBB',
            driveType: 'BBBBBB',
            strapTensionMax: 1,
            strapWidth: 'BBBBBB',
            strappingsPerDay: 1,
            akkuType: 'BBBBBB',
            akkuBrand: 'BBBBBB',
            akkuCapacitiy: 1,
            akkuVoltage: 1,
            sealFixity: 1,
            speed: 1,
            motors: 1,
            strapThicknessMin: 1,
            strapThicknessMax: 1,
            isInProductFinder: true,
            isFullyAutomaticTension: true,
            isWeldingByButton: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            timestamp: currentDate,
            modificationDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Item', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
