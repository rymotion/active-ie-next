import { Rule, BusinessRule } from '@/rules/types';

export class RulesService {
  private static instance: RulesService;
  private rules: Map<string, Rule> = new Map();
  private businessRules: Map<string, BusinessRule> = new Map();

  private constructor() {}

  public static getInstance(): RulesService {
    if (!RulesService.instance) {
      RulesService.instance = new RulesService();
    }
    return RulesService.instance;
  }

  public addRule(name: string, rule: Rule): void {
    this.rules.set(name, rule);
  }

  public addBusinessRule(name: string, rule: BusinessRule): void {
    this.businessRules.set(name, rule);
  }

  public validate(name: string, data: any): boolean {
    const rule = this.rules.get(name);
    if (!rule) {
      throw new Error(`Rule '${name}' not found`);
    }
    return rule.validate(data);
  }

  public executeBusinessRule(name: string, data: any): any {
    const rule = this.businessRules.get(name);
    if (!rule) {
      throw new Error(`Business rule '${name}' not found`);
    }
    
    // Check conditions if any
    if (rule.conditions) {
      const conditionsMet = rule.conditions.every(condition => condition(data));
      if (!conditionsMet) {
        return null;
      }
    }

    return rule.execute(data);
  }

  public getRule(name: string): Rule | undefined {
    return this.rules.get(name);
  }

  public getBusinessRule(name: string): BusinessRule | undefined {
    return this.businessRules.get(name);
  }
}

// Export the singleton instance
export const rulesService = RulesService.getInstance();
