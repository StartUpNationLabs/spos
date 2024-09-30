import { TYPES } from '../types';
import {
  BillingService,
  MonsieurAxelMenvoie2,
  TableSummary,
} from './billingService';
import { inject, injectable } from "inversify";
import { BackendBffApiService } from '../apis/backendBffApiService';
import { logger } from "../logger";
@injectable()
export class BillingRemoteService implements BillingService {
  constructor(
    @inject(TYPES.BackendBffApiService)
    private backendBffApiService: BackendBffApiService
  ) {}
  @logger
  async getBillingSummary(groupId: string): Promise<TableSummary[]> {
    return (
      await this.backendBffApiService
        .getRemoteBillingApi()
        .remoteBillingControllerGetBillingSummary({ groupId })
    ).data;
  }
  @logger
  async partialPayment(payment: MonsieurAxelMenvoie2): Promise<void> {
    return (
      await this.backendBffApiService
        .getRemoteBillingApi()
        .remoteBillingControllerPartialPayment({
          annotatedMonsieurAxelMenvoie2: payment,
        })
    ).data;
  }
}
