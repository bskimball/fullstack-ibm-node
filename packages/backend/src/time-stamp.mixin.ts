import { MixinTarget } from "@loopback/core";

export function TimeStampMixin<T extends MixinTarget<object>>(BaseClass: T) {
  return class extends BaseClass {
    public createdAt: Date;

    constructor(...args: any[]) {
      super(args);
      this.createdAt = new Date();
    }

    printTimestamp() {
      console.log(`Instance created at: ${this.createdAt}`);
    }

    log(str: string) {
      console.log(`Prints out a string: ${str}`);
    }
  };
}
