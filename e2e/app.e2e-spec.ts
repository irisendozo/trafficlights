import { TrafficdemoPage } from './app.po';

describe('trafficdemo App', () => {
  let page: TrafficdemoPage;

  beforeEach(() => {
    page = new TrafficdemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
