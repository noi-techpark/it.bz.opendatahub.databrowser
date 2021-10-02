// import {
//   defaultPagination,
//   GenericPagination,
//   getCurrentPage,
//   getPageCount,
//   hasNextPage,
//   isWithTourismPagination,
//   paginationFromArray,
//   paginationFromTourismData,
//   WithTourismPagination,
// } from './pagination';

// const defaultTourismPagination: WithTourismPagination = {
//   CurrentPage: 0,
//   Items: [],
//   NextPage: '',
//   PreviousPage: '',
//   TotalPages: 0,
//   TotalResults: 0,
// };

// describe('paginationFromTourismData', () => {
//   test('should return default pagination when input parameter is undefined', () => {
//     const pagination = paginationFromTourismData(undefined as any);
//     expect(pagination).toEqual(defaultPagination);
//   });
//   test('should return default pagination when input parameter is null', () => {
//     const pagination = paginationFromTourismData(null as any);
//     expect(pagination).toEqual(defaultPagination);
//   });
//   test('should return limit=0, offset=0, total=0 when input parameter has zero/empty values', () => {
//     const pagination = paginationFromTourismData(defaultTourismPagination);
//     expect(pagination).toEqual(defaultPagination);
//   });
//   test('should return limit=0 when TotalResults is 0', () => {
//     const pagination = paginationFromTourismData({
//       ...defaultTourismPagination,
//       TotalResults: 0,
//     });
//     expect(pagination.limit).toEqual(0);
//   });
//   test('should return limit=TotalResults when TotalPages === 1', () => {
//     const TotalResults = 10;
//     const TotalPages = 1;
//     const pagination = paginationFromTourismData({
//       ...defaultTourismPagination,
//       TotalResults,
//       TotalPages,
//       Items: Array.from(Array(TotalResults)),
//     });
//     expect(pagination.limit).toEqual(TotalResults);
//   });
//   test('should return limit=Items.length when NextPage is set', () => {
//     const itemCount = 37;
//     const pagination = paginationFromTourismData({
//       ...defaultTourismPagination,
//       NextPage: 'some URL',
//       Items: Array.from(Array(37)),
//     });
//     expect(pagination.limit).toEqual(itemCount);
//   });
//   test('should return limit=Items.length when NextPage is undefined/null/empty and TotalPages <= 1', () => {
//     const itemCount = 37;
//     const pagination1 = paginationFromTourismData({
//       ...defaultTourismPagination,
//       NextPage: null,
//       Items: Array.from(Array(37)),
//     });
//     expect(pagination1.limit).toEqual(itemCount);

//     const pagination2 = paginationFromTourismData({
//       ...defaultTourismPagination,
//       NextPage: null,
//       Items: Array.from(Array(37)),
//     });
//     expect(pagination2.limit).toEqual(itemCount);

//     const pagination3 = paginationFromTourismData({
//       ...defaultTourismPagination,
//       NextPage: null,
//       Items: Array.from(Array(37)),
//     });
//     expect(pagination3.limit).toEqual(itemCount);
//   });
//   test('should return offset=0 when CurrentPage=0', () => {
//     const pagination = paginationFromTourismData({
//       ...defaultTourismPagination,
//       CurrentPage: 0,
//     });
//     expect(pagination.offset).toEqual(0);
//   });
//   test('should return offset=(CurrentPage - firstPage) when firstPage > 0', () => {
//     const CurrentPage = 1;
//     const firstPage = 1;
//     const pagination = paginationFromTourismData(
//       {
//         ...defaultTourismPagination,
//         CurrentPage,
//       },
//       firstPage
//     );
//     expect(pagination.offset).toEqual(0);
//   });
//   test('should return offset=0 when limit=0', () => {
//     const pagination = paginationFromTourismData({
//       ...defaultTourismPagination,
//       TotalResults: 0,
//     });
//     expect(pagination.offset).toEqual(0);
//   });
//   test('should return offset=(CurrentPage * limit) when CurrentPage > 0 and limit > 0', () => {
//     const CurrentPage = 2;
//     const pagination = paginationFromTourismData({
//       ...defaultTourismPagination,
//       CurrentPage,
//       TotalPages: 3,
//       TotalResults: 17,
//     });
//     expect(pagination.offset).toEqual(CurrentPage * pagination.limit);
//   });
//   test('should return total=TotalResults', () => {
//     const TotalResults = 17;
//     const pagination = paginationFromTourismData({
//       ...defaultTourismPagination,
//       TotalResults,
//     });
//     expect(pagination.total).toEqual(TotalResults);
//   });
// });

// describe('getPageCount', () => {
//   test('should return 1 when pagination is undefined/null', () => {
//     const totalPages1 = getPageCount(undefined as any);
//     expect(totalPages1).toBe(1);

//     const totalPages2 = getPageCount(null as any);
//     expect(totalPages2).toBe(1);
//   });
//   test('should return 1 when pagination.total is undefined/null', () => {
//     const totalPages1 = getPageCount({
//       ...defaultPagination,
//       total: undefined as any,
//     });
//     expect(totalPages1).toBe(1);

//     const totalPages2 = getPageCount({
//       ...defaultPagination,
//       total: null as any,
//     });
//     expect(totalPages2).toBe(1);
//   });
//   test('should return 1 when pagination.total=0', () => {
//     const totalPages = getPageCount({ ...defaultPagination, total: 0 });
//     expect(totalPages).toBe(1);
//   });
//   test('should return 1 when pagination.limit is undefined/null', () => {
//     const totalPages1 = getPageCount({
//       ...defaultPagination,
//       limit: undefined as any,
//     });
//     expect(totalPages1).toBe(1);

//     const totalPages2 = getPageCount({
//       ...defaultPagination,
//       limit: null as any,
//     });
//     expect(totalPages2).toBe(1);
//   });
//   test('should return 1 when pagination.limit=0', () => {
//     const totalPages = getPageCount({ ...defaultPagination, limit: 0 });
//     expect(totalPages).toBe(1);
//   });
//   test('should return Math.floor(pagination.total / pagination.limit) when reminder(pagination.total / pagination.limit) === 0', () => {
//     const total = 8;
//     const limit = 2;
//     const totalPages = getPageCount({
//       ...defaultPagination,
//       total,
//       limit,
//     });
//     expect(totalPages).toBe(Math.floor(total / limit));
//   });
//   test('should return (Math.floor(pagination.total / pagination.limit) + 1) when reminder(pagination.total / pagination.limit) === 0', () => {
//     const total = 11;
//     const limit = 2;
//     const totalPages = getPageCount({
//       ...defaultPagination,
//       total,
//       limit,
//     });
//     expect(totalPages).toBe(Math.floor(total / limit) + 1);
//   });
//   test('should return 1 when pagination.total < pagination.limit', () => {
//     const total = 11;
//     const limit = total + 1;
//     const totalPages = getPageCount({
//       ...defaultPagination,
//       total,
//       limit,
//     });
//     expect(totalPages).toBe(1);
//   });
// });

// describe('paginationFromArray', () => {
//   test('should return limit=0, offset=0, total=0 when input parameter is undefined', () => {
//     const pagination = paginationFromArray(undefined as any);
//     expect(pagination).toEqual(defaultPagination);
//   });
//   test('should return limit=0, offset=0, total=0 when input parameter is null', () => {
//     const pagination = paginationFromArray(null as any);
//     expect(pagination).toEqual(defaultPagination);
//   });
//   test('should return limit=data.length, offset=0, total=data.length when input parameter is null', () => {
//     const pagination = paginationFromArray(null as any);
//     expect(pagination).toEqual(defaultPagination);
//   });
//   test('should return limit=0, offset=0, total=0 when input parameter is empty array', () => {
//     const pagination = paginationFromArray([]);
//     expect(pagination).toEqual(defaultPagination);
//   });
//   test('should return limit=array.length, offset=0, total=array.length when input parameter array.length > 0', () => {
//     const array = [1, 2];
//     const arrayLength = array.length;
//     const pagination = paginationFromArray([1, 2]);
//     expect(pagination).toEqual({
//       ...defaultPagination,
//       limit: arrayLength,
//       total: arrayLength,
//     });
//   });
// });

// describe('isWithTourismPagination', () => {
//   test('should return false when input parameter is undefined', () => {
//     const result = isWithTourismPagination(undefined as any);
//     expect(result).toBe(false);
//   });
//   test('should return false when input parameter is null', () => {
//     const result = isWithTourismPagination(null as any);
//     expect(result).toBe(false);
//   });
//   test('should return false when TotalResults is undefined', () => {
//     const result = isWithTourismPagination({
//       ...defaultTourismPagination,
//       TotalResults: undefined,
//     });
//     expect(result).toBe(false);
//   });
//   test('should return false when TotalResults is null', () => {
//     const result = isWithTourismPagination({
//       ...defaultTourismPagination,
//       TotalResults: null,
//     });
//     expect(result).toBe(false);
//   });
//   test('should return false when TotalPages is undefined', () => {
//     const result = isWithTourismPagination({
//       ...defaultTourismPagination,
//       TotalPages: undefined,
//     });
//     expect(result).toBe(false);
//   });
//   test('should return false when TotalPages is null', () => {
//     const result = isWithTourismPagination({
//       ...defaultTourismPagination,
//       TotalPages: null,
//     });
//     expect(result).toBe(false);
//   });
//   test('should return false when Items is undefined', () => {
//     const result = isWithTourismPagination({
//       ...defaultTourismPagination,
//       Items: undefined,
//     });
//     expect(result).toBe(false);
//   });
//   test('should return false when Items is null', () => {
//     const result = isWithTourismPagination({
//       ...defaultTourismPagination,
//       Items: null,
//     });
//     expect(result).toBe(false);
//   });
//   test('should return true when TotalResults, TotalPages and Items are set', () => {
//     const result = isWithTourismPagination({
//       TotalResults: 0,
//       TotalPages: 0,
//       Items: [],
//     });
//     expect(result).toBe(true);
//   });
// });

// describe('getCurrentPage', () => {
//   test('should return 1 when pagination is undefined/null', () => {
//     const currentPage1 = getCurrentPage(undefined as any);
//     expect(currentPage1).toEqual(1);

//     const currentPage2 = getCurrentPage(null as any);
//     expect(currentPage2).toEqual(1);
//   });
//   test('should return 1 when pagination.offset is undefined/null', () => {
//     const currentPage1 = getCurrentPage({
//       ...defaultPagination,
//       offset: undefined as any,
//     });
//     expect(currentPage1).toEqual(1);

//     const currentPage2 = getCurrentPage({
//       ...defaultPagination,
//       offset: null as any,
//     });
//     expect(currentPage2).toEqual(1);
//   });
//   test('should return 1 when pagination.limit is undefined/null', () => {
//     const currentPage1 = getCurrentPage({
//       ...defaultPagination,
//       limit: undefined as any,
//     });
//     expect(currentPage1).toEqual(1);

//     const currentPage2 = getCurrentPage({
//       ...defaultPagination,
//       limit: null as any,
//     });
//     expect(currentPage2).toEqual(1);
//   });
//   test('should return 1 when pagination.limit === 0', () => {
//     const currentPage = getCurrentPage({
//       ...defaultPagination,
//       limit: 0,
//     });
//     expect(currentPage).toEqual(1);
//   });
//   test('should return 1 when pagination.offset === 0', () => {
//     const currentPage = getCurrentPage({
//       ...defaultPagination,
//       offset: 0,
//     });
//     expect(currentPage).toEqual(1);
//   });
//   test('should return Math.floor(pagination.offset / pagination.limit) + 1', () => {
//     const total = 30;
//     const offset = 23;
//     const limit = 7;
//     const currentPage = getCurrentPage({
//       total,
//       offset,
//       limit,
//     });
//     expect(currentPage).toEqual(Math.floor(offset / limit) + 1);
//   });
// });

// describe('hasNext', () => {
//   it.each`
//     offset | limit | total
//     ${2}   | ${4}  | ${5}
//     ${150} | ${50} | ${200}
//     ${150} | ${51} | ${200}
//   `(
//     `should return false when offset + limit >= total (offset=$offset, limit=$limit, total=$total`,
//     ({ offset, limit, total }) => {
//       const pagination: GenericPagination = {
//         ...defaultPagination,
//         offset,
//         total,
//         limit,
//       };

//       console.log(
//         'XXXXX',
//         getCurrentPage(pagination),
//         getPageCount(pagination)
//       );

//       const nextPage = hasNextPage(pagination);
//       expect(nextPage).toEqual(false);
//     }
//   );

//   test('should return false when not on last page', () => {
//     const pagination1: GenericPagination = {
//       ...defaultPagination,
//       offset: 150,
//       total: 200,
//       limit: 51,
//     };
//     const nextPage1 = hasNextPage(pagination1);
//     expect(nextPage1).toEqual(false);

//     const pagination2: GenericPagination = {
//       ...defaultPagination,
//       offset: 150,
//       total: 200,
//       limit: 50,
//     };
//     const nextPage2 = hasNextPage(pagination2);
//     expect(nextPage2).toEqual(false);
//   });
// });
