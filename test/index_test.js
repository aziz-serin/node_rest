const supertest = require('supertest');
const app = require("../src/index");
const chai = require('chai');
const expect = chai.expect;
// test our simple server
let test = supertest(app);
var request = require('request');

// Test post function
describe('POST/hook', function (){
   it("Test hook good", async()=>{
      var response = await test.post("/hook").send({
            "type": "episode.downloaded",
            "event_id": "123e4567-e89b-12d3-a456-426614174000",
            "occurred_at": "2022-03-17 12:34:47",
            "data": {
                "episode_id": "123e4567-e89b-12d3-a456-426614174001",
                "podcast_id": "123e4567-e89b-12d3-a456-426614174002"
            }
      });
      expect(response.status).to.equal(200);
   });
});

describe('BAD POST/hook', function (){
   it("Test hook bad", async () => {
      var response = await test.post("/hook").send({
            "event_id": "123e4567-e89b-12d3-a456-426614174000",
            "occurred_at": "2022-03-17 12:34:47",
            "data": {
                "episode_id": "123e4567-e89b-12d3-a456-426614174001",
                "podcast_id": "123e4567-e89b-12d3-a456-426614174002"
            }
      });
      // Check if the query fails
      expect(response.status).to.not.equal(200);
   });
});

// Test get function without a query body
describe('GET/time_chart_data', function (){
  it('Test GET', async ()=>{
        var options = {
          'method': 'GET',
          'url': 'http://localhost:3000/time_chart_data',
          'headers': {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "episode_id": "123e4567-e89b-12d3-a456-426614174001"
          })

        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          expect(respsonse.body).to.not.be.null;
          expect(JSON.stringify(response.body)).to.contain("123e4567-e89b-12d3-a456-426614174001");
        });
  });
});

// Test bad get
describe('BAD GET/time_chart_data', function (){
  it('Test GET bad', async ()=>{
      var response = await test.get("/time_chart_data");
      // Check if the response returns 500
      expect(response.status).to.equal(500);
  });
});

// Test post and get using a query body
describe('GET/time_chart_data and POST/hooks', function(){
    it('Test POST and GET', async () => {
        // First POST
        var response = await test.post("/hook").send({
            "type": "episode.downloaded",
            "event_id": "123e4567-e89b-12d3-a456-426614174000",
            "occurred_at": "2022-03-17 12:34:47",
            "data": {
                "episode_id": "123e4567-e89b-12d3-a456-426614174001",
                "podcast_id": "123e4567-e89b-12d3-a456-426614174002"
            }
        });
        expect(response.status).to.equal(200);
        // Then GET
        var options = {
          'method': 'GET',
          'url': 'http://localhost:3000/time_chart_data',
          'headers': {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "episode_id": "123e4567-e89b-12d3-a456-426614174001"
          })

        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          expect(respsonse.body).to.not.be.null;
          expect(JSON.stringify(response.body)).to.contain("123e4567-e89b-12d3-a456-426614174001");
        });
    });
});
