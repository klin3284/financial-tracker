import { Controller, Get, Route, Tags } from 'tsoa';

@Route('test')
@Tags('test')
export class TestController extends Controller {
  @Get('/')
  public async getTestMessage(): Promise<string> {
    return 'Hello, TSOA!';
  }
}
