const request = require('supertest');

const app = require('./index');


describe('GET /', () => {
    it('GET / => Returns index.html', () => {
      return request(app).get('/').expect('Content-Type', /html/);
    });

    it('GET /api => Returns current date in unix and utc', () => {
        return request(app).get('/api').expect(200).then(res => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    unix: expect.any(Number),
                    utc: expect.any(String)
                })
            )
        })
    })

    it('GET /api/1451001600000 => Returns given UNIX date in unix and utc', () => {
        return request(app).get('/api/1451001600000').expect(200).then(res => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    unix: 1451001600000,
                    utc: "Fri, 25 Dec 2015 00:00:00 GMT"
                })
            )
        })
    })

    it('GET /api/2015-12-25 => Returns given date in unix and utc', () => {
        return request(app).get('/api/2015-12-25').expect(200).then(res => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    unix: 1451001600000,
                    utc: "Fri, 25 Dec 2015 00:00:00 GMT"
                })
            )
        })
    })
  });