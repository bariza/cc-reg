import { LocalStorageService } from './local-storage.service';
describe('LocalStorageService', () => {
  let localStorage: LocalStorageService;
  const testData = {
    APP_LANGUAGE: 'APP_LANGUAGE',
    ENGLISH: 'ENGLISH'
  };
  beforeEach(() => {
    localStorage = new LocalStorageService();
    window.localStorage.clear();
  });
  it('should set the item in browser\'s local storage', () => {
    localStorage.set(testData.APP_LANGUAGE, testData.ENGLISH);
    expect(window.localStorage.getItem(testData.APP_LANGUAGE)).toEqual(JSON.stringify(testData.ENGLISH));
  });
  it('should get the item from browser\'s local storage', () => {
    window.localStorage.setItem(JSON.stringify(testData.APP_LANGUAGE), JSON.stringify(testData.ENGLISH));
    expect(localStorage.get(JSON.stringify(testData.APP_LANGUAGE))).toEqual(testData.ENGLISH);
  });
  it('should throw null when retrieving string that cannot be parsed from browser\'s local storage', () => {
    window.localStorage.setItem(JSON.stringify(testData.APP_LANGUAGE), testData.ENGLISH);
    expect(localStorage.get(JSON.stringify(testData.APP_LANGUAGE))).toEqual(null);
  });
  it('should remove the item from browser\'s local storage', () => {
    localStorage.set(testData.APP_LANGUAGE, testData.ENGLISH);
    localStorage.remove(testData.APP_LANGUAGE);
    expect(localStorage.get(JSON.stringify(testData.APP_LANGUAGE))).toEqual(null);
  });
  it('should empty the browser\'s local storage', () => {
    localStorage.set(testData.APP_LANGUAGE, testData.ENGLISH);
    localStorage.clear();
    expect(localStorage.get(JSON.stringify(testData.APP_LANGUAGE))).toEqual(null);
  });
}); 
