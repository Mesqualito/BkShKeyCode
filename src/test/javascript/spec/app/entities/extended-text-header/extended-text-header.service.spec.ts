import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ExtendedTextHeaderService } from 'app/entities/extended-text-header/extended-text-header.service';
import { IExtendedTextHeader, ExtendedTextHeader } from 'app/shared/model/extended-text-header.model';

describe('Service Tests', () => {
  describe('ExtendedTextHeader Service', () => {
    let injector: TestBed;
    let service: ExtendedTextHeaderService;
    let httpMock: HttpTestingController;
    let elemDefault: IExtendedTextHeader;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ExtendedTextHeaderService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ExtendedTextHeader(0, currentDate, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            startingDate: currentDate.format(DATE_TIME_FORMAT),
            endingDate: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a ExtendedTextHeader', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            startingDate: currentDate.format(DATE_TIME_FORMAT),
            endingDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            timestamp: currentDate,
            startingDate: currentDate,
            endingDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new ExtendedTextHeader(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ExtendedTextHeader', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            tableName: 'BBBBBB',
            no: 'BBBBBB',
            startingDate: currentDate.format(DATE_TIME_FORMAT),
            endingDate: currentDate.format(DATE_TIME_FORMAT),
            textNo: 1,
            description: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timestamp: currentDate,
            startingDate: currentDate,
            endingDate: currentDate
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

      it('should return a list of ExtendedTextHeader', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            tableName: 'BBBBBB',
            no: 'BBBBBB',
            startingDate: currentDate.format(DATE_TIME_FORMAT),
            endingDate: currentDate.format(DATE_TIME_FORMAT),
            textNo: 1,
            description: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            timestamp: currentDate,
            startingDate: currentDate,
            endingDate: currentDate
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

      it('should delete a ExtendedTextHeader', () => {
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
