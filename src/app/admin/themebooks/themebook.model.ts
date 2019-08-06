export class Themebook {
  tbtype: String;
  name: String;
  ptagq: {
    A: String,
    B: String,
    C: String,
    D: String,
    E: String,
    F: String,
    G: String,
    H: String,
    I: String,
    J: String
  };
  wtagq: {
    A: String,
    B: String,
    C: String,
    D: String
  };
  improvements: [
    {
      name: String,
      description: String
    }
  ]
}