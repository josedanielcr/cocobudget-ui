export class TransactionInsight {
  type : TransactionInsightTypeEnum | undefined;
  message : string | undefined;
}

export enum TransactionInsightTypeEnum {
  Problematic,
  Warning,
  Suggestion,
  Success
}
