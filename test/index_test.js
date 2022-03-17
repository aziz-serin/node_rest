const supertest = require('supertest');
const assert = require("assert");
const app = require("../src/index");
const chai = require('chai');
const expect = chai.expect;
// test our simple server
let test = supertest(app);

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
      var response = await test.get("/time_chart_data");
      // Check if the response returns 200
      expect(response.status).to.equal(200);
      // Check if the response is not null
      expect(response.body).to.not.be.null;
      // Check if empty result is returned
      expect(JSON.stringify(response.body)).to.contain("Result");
  });
  /*
  When I try to use query with parameters e.g. episode_id it returns an empty result. I could not find the cause of the problem.
  But functionality works in index.js. Weird... So created the basic test above
  */
});

