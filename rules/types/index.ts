export interface Rule {
  validate: (data: any) => boolean;
  message?: string;
}

export interface BusinessRule {
  execute: (data: any) => any;
  conditions?: Array<(data: any) => boolean>;
}
