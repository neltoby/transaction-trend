export default abstract class Log {
  constructor(){}

  abstract info(message: string): void;

  abstract error(message: string): void;
}