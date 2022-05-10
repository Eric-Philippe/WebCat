export interface Infos {
  name: string;
  content: string;
  require: number;
  id: string;
  quizz: boolean;
}

export class CatModel {
  constructor(
    public name: string,
    public description: string,
    public imageUrl: string,
    public treat: string,
    public remaining: number,
    public infos: Infos[]
  ) {}
}
