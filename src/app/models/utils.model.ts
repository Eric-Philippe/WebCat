import { Infos } from './catModel.model';

export function buildRemaining(links: Infos[], amount: string): number {
  for (var i = 0; i < links.length; i++) {
    if (links[i].require > parseInt(amount)) {
      break;
    }
  }
  return i;
}
