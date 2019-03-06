import inputParsers from './InputParsers';

const InputParser = {
  parseInputData: (form, data) => {
    // parsing form data
    for (let name of data.keys()) {
      const input = form.elements[name];
      const parserName = input.dataset.parse;

      if (parserName) {
        const parser = inputParsers[parserName];
        const parsedValue = parser(data.get(name));
        data.set(name, parsedValue);
      }
    }
  },
};

export default InputParser;
