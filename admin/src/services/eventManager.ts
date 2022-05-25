class EventManager {
  map: {[key: string]: any} = {};

  assign(event: string, fn: Function) {
    if (!Object.prototype.hasOwnProperty.call(this, event)) {
      this.map[event] = [];
    }
    this.map[event].push(fn);
    return this.unassign.bind(this, event, fn);
  }

  subscribe(events: Array<string> | string, fn: Function) : CallableFunction {
    if (Array.isArray(events)) {
      return this.unsubscribe.bind(
        this,
        events.map((ev) => this.assign(ev, fn)),
      );
    }
    return this.unsubscribe.bind(this, [this.assign(events, fn)]);
  }

  unassign(event: string, fn: Function) {
    const index = this.map[event].indexOf(fn);
    if (index > -1) {
      this.map[event].splice(index, 1);
    }
  }

  unsubscribe(unsubscriptions: Array<Function>) : void {
    unsubscriptions.map((unassign) => unassign());
  }

  notify(event: string, ...callArgs: any[]) {
    if (!Object.prototype.hasOwnProperty.call(this, event) || this.map[event].length === 0) {
      return;
    }
    const args = Array.prototype.slice.call(callArgs, 1);
    args.push(event);
    this.map[event].map((fn: Function) => fn.apply(this, args));
  }
}

export default new EventManager();
