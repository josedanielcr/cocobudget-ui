class CurrencyCodes {
  name : string | undefined;
  code : string | undefined;
}

export class Currency {
  result : string | undefined;
  documentation : string | undefined;
  terms_of_use : string | undefined;
  supportedCurrencyCodes : CurrencyCodes[] | undefined;
}
