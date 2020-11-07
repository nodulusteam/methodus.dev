import { PrettyPrintPipe } from './prettyprint';

describe('PrettyPrintPipe: Default', () => {
  let pipe: PrettyPrintPipe;

  beforeEach(() => {
    pipe = new PrettyPrintPipe();
  });

  it('to render', () => {
    expect(pipe.transform({ key1: 'value1', key2: 'value2' })).toEqual( `{<br/>&nbsp; "key1": "value1",
  "key2": "value2"
}` );
});
  it('to render', () => {
    expect(pipe.transform('')).toEqual('""');
  });
});
