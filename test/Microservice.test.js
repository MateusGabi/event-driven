const { test, assert } = require("testing-library");
const Microservice = require("../packages/client");

test("Microservice shape", () => {
  let MicroserviceInstance = new Microservice();

  assert(MicroserviceInstance).should.be.truthy();

  // props
  assert(MicroserviceInstance.eventBus).should.be.truthy();
  assert(MicroserviceInstance.eventBus.uri).should.be.truthy();
  assert(MicroserviceInstance.eventBus.port).should.be.truthy();

  // attributes
  assert(MicroserviceInstance.socket).should.be.truthy();

  // methods
  assert(MicroserviceInstance.listenEvent).should.be.instanceOf.function();
  assert(MicroserviceInstance.sendEvent).should.be.instanceOf.function();
});
