import { RsaDevicePrintService } from './rsa-device-print.service';
describe('RsaDevicePrintService', () => {
  let RsaDevicePrint:  RsaDevicePrintService;
  beforeEach(() => {
    RsaDevicePrint =  new RsaDevicePrintService();
  });
  it('should be created', () => {
    expect(RsaDevicePrint).toBeTruthy();
  });
});
