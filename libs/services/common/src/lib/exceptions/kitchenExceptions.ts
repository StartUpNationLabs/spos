export class KitchenNotFoundException extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'KitchenNotFoundException';
    }
}
