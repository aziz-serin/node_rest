const supertest = require('supertest');
const app = require("../src/index");
const chai = require('chai');
const expect = chai.expect;
// test our simple server
let test = supertest(app);
var request = require('request');


describe('POST/hook', function (){
   it("Test hook", async () =>{
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

describe('GET/time_chart_data', function (){
  it('Test Status Basic', async () =>{
      await test.post("/hook").send({
            "type": "episode.downloaded",
            "event_id": "123e4567-e89b-12d3-a456-426614174000",
            "occurred_at": "2022-03-17 12:34:47",
            "data": {
                "episode_id": "123e4567-e89b-12d3-a456-426614174001",
                "podcast_id": "123e4567-e89b-12d3-a456-426614174002"
            }
      });
      var response = await test.get("/time_chart_data");
      // Check if the response returns 200
      expect(response.status).to.equal(200);
      // Check if the response is not null
      expect(response.body).to.not.be.null;
      // Check if empty result is returned
      expect(JSON.stringify(response.body)).to.contain("Result");
  });
});

describe('GET/time_chart_data and POST/hooks', function(){
    it('Test POST and GET', async()=> {
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
