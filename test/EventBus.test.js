const { test, assert } = require("testing-library");
const EventBus = require("../packages/event-bus");

test("EventBus shape", () => {
  let eventBusInstance = new EventBus();

  assert(eventBusInstance).should.be.truthy();

  // props
  assert(eventBusInstance.port).should.be.truthy();
  assert(eventBusInstance.onMicroserviceConnection).should.be.false();

  // attributes
  assert(eventBusInstance.app).should.be.instanceOf.function();
  assert(eventBusInstance.server).should.be.instanceOf.function();
  assert(eventBusInstance.io).should.be.instanceOf.function();

  // methods
  assert(
    eventBusInstance.onConnectStartHandler
  ).should.be.instanceOf.function();
  assert(eventBusInstance.setUpMiddlewares).should.be.instanceOf.function();
  assert(eventBusInstance.setUpRoutes).should.be.instanceOf.function();
  assert(eventBusInstance.start).should.be.instanceOf.function();

  eventBusInstance = new EventBus({
    port: 9876
  });

  //   assert(eventBusInstance.port).should.be.equalTo(9876);
});
