import { KeysPipe } from './keys-pipe';

describe('KeysPipe: Default', () => {
  let pipe: KeysPipe;

  beforeEach(() => {
    pipe = new KeysPipe();
  });

  it('to render', () => {
    expect(pipe.transform({ key1: 'value1', key2: 'value2' })).toEqual( ['key1', 'key2'] );
  });
  it('to render', () => {
    expect(pipe.transform('')).toEqual([]);
  });
});
