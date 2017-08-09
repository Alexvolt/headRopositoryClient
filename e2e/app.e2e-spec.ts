import { HeadRepositoryPage } from './app.po';

describe('head-repository App', () => {
  let page: HeadRepositoryPage;

  beforeEach(() => {
    page = new HeadRepositoryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
