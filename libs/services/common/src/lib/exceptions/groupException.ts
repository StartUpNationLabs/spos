export class GroupNotFoundException extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'GroupNotFoundException';
    }
}

export class NoGroupsFoundException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "NoGroupsFoundException";
    }
}
  