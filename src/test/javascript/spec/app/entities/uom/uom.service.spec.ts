import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { UomService } from 'app/entities/uom/uom.service';
import { IUom, Uom } from 'app/shared/model/uom.model';

describe('Service Tests', () => {
  describe('Uom Service', () => {
    let injector: TestBed;
    let service: UomService;
    let httpMock: HttpTestingController;
    let elemDefault: IUom;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(UomService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Uom(0, currentDate, currentDate, 0, 'AAAAAAA', 'AAAAAAA', 0);
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

      it('should create a Uom', () => {
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
          .create(new Uom(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Uom', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            modificationDate: currentDate.format(DATE_TIME_FORMAT),
            rank: 1,
            code: 'BBBBBB',
            description: 'BBBBBB',
            factor: 1
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

      it('should return a list of Uom', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            modificationDate: currentDate.format(DATE_TIME_FORMAT),
            rank: 1,
            code: 'BBBBBB',
            description: 'BBBBBB',
            factor: 1
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

      it('should delete a Uom', () => {
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
