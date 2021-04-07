export class CpfValidator {

    constructor() {

    }

    public static validate(cpf: string): boolean {
        if (cpf === null || cpf === undefined) {
            return false;
        }

        cpf = cpf.replace(/\D/g, '');

        if(cpf.length != 11 || new RegExp(/^([0-9])\\1+$/).test(cpf)) {
            return false;
        }

        let digit = cpf.substring(0, 9);

        for(let j = 10;  j <= 11; j++) {
            let sum = 0;
            
            for(let i = 0; i < j - 1; i++) {
                sum += (j - i) * parseInt(digit[i]);
            }

            const summod11 = sum % 11;
            const replacement = (summod11 < 2 ? 0 : 11 - summod11).toString();

            digit = this.replaceAt(digit, replacement, j - 1);  
        }

        return digit.charAt(9) === cpf.charAt(9) && digit.charAt(10) === cpf.charAt(10);
    }

    private static replaceAt(value: string, replacement: string, position: number) : string {
        return value.substr(0, position) + replacement + value.substr(position + replacement.length)
    }
}
