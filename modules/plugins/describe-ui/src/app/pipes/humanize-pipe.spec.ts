import { HumanizePipe } from './humanize-pipe';

describe('Pipe: Default', () => {
    let pipe: HumanizePipe;

    beforeEach(() => {
      pipe = new HumanizePipe();
    });

    it('to render', () => {
        expect(pipe.transform('CamelClassName')).toBe('Camel Class Name');
      });
      it('to render', () => {
        expect(pipe.transform('')).toBe('');
      });
  });
