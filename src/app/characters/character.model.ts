export class Character {
  _id: string;
  name: string;
  mythos: string;
  logos: string;
  cards: [
    {
      cardtype: string;
      theme: string;
      title: string;
      qors: string;
      ptags: [
        {
          letter: string;
          tag: string;
        }
      ];
      wtags: [
        {
          letter: string;
          tag: string;
        }
      ];
    }
  ];
}