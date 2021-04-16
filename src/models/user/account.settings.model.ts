export class AccountSettingsModel{
  accountPlan: string
  active: string
  blocked: string
  createdAt: string
  expiredAt: string
  updatedAt: string

  constructor(accountPlan: string, active: string, blocked: string, createdAt: string, expiredAt: string, updatedAt: string) {
    this.accountPlan = accountPlan;
    this.active = active;
    this.blocked = blocked;
    this.createdAt = createdAt;
    this.expiredAt = expiredAt;
    this.updatedAt = updatedAt;
  }
}
