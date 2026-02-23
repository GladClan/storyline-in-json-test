// A creature object with functions such as attack, heal, and takeDamage

export class DamageableEntity {
    private name: string;
    private maxHealth: number;
    private currentHealth: number;
    private maxMana: number;
    private currentMana: number;
    private isAlive = true;
    private alignment: string;
    private elementalResistance: Record<string, number> = {};
    private attribute: Record<string, number> = {};

    constructor(name: string, health: number, mana: number, alignmnet: string) {
        this.name = name;
        this.maxHealth = health;
        this.currentHealth = health;
        this.maxMana = mana;
        this.currentMana = mana;
        this.alignment = alignmnet;
    }

    addElementalResistance(element: string, amt: number): number {
        if (element in this.elementalResistance) {
            this.elementalResistance[element] += amt;
        }
        else { this.elementalResistance[element] = amt; }
        return this.elementalResistance[element];
    }

    addAttribute(name: string, level: number): boolean {
        if (name in this.attribute) {
            return false;
        } 
        if (this.attribute[name] < level) {
            this.attribute[name] = level;
        }
        return true;
    }

    private loseHealth(damage: number) {
        if (damage > this.currentHealth) {
            this.currentHealth = 0;
            this.isAlive = false;
        } else {
            this.currentHealth -= damage;
        }
    }

    private gainHealth(heal: number): number {
        if (this.maxHealth - this.currentHealth < heal) {
            const actual = this.maxHealth - this.currentHealth;
            this.currentHealth = this.maxHealth;
            return actual;
        }
        this.currentHealth += heal;
        return heal;
    }

    takeDamage(damage: number, source: DamageableEntity, element?: string[]): number {
        let actual = damage;
        if (element) {
            for (const note in element) {
                if (note in this.elementalResistance) {
                    actual *= this.elementalResistance[note];
                }
            }
        }
        this.loseHealth(actual);
        return damage
    }

    heal(amount: number, element?: string[]): number {
        let actual = amount;
        if (element) {
            for (const note in element) {
                if (note in this.elementalResistance) {
                    actual *= this.elementalResistance[note];
                }
            }
        }
        actual = this.gainHealth(actual);
        return actual;
    }

    gianMana(amount: number): number {
        let actual = amount;
        if (this.currentMana + amount > this.maxMana) {
            actual = this.maxMana - this.currentMana;
            this.currentMana = this.maxMana;
            return actual;
        } else {
            this.currentMana += actual;
            return actual;
        }
    }
}