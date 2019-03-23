export class ConfirmBeforeAction {
  ok: any;
  cancel: any;

  constructor(ok, cancel) {
    this.ok = ok;
    this.cancel = cancel;
  }
}
