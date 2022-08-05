import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function buildEnumBundle<V extends string | number = string>(
    nameValueMap: { [k: string]: V },
) {
    type M = typeof nameValueMap;

    const {names, values, valueNameMap} = Object
        .entries(nameValueMap)
        .reduce((accumulator: { names: Array<keyof M>; values: V[]; valueNameMap: { [k in V]: string } }, [key, value]) => {
            accumulator.names.push(key);
            accumulator.values.push(value as V);
            accumulator.valueNameMap[value] = key;
            return accumulator;
        }, {values: [], names: [], valueNameMap: {} as any});

    interface ResolveNameByValue {
        (value: V): string;

        <S extends boolean>(value: V, strict: S): S extends true ? string : string | undefined;
    }

    const resolveNameByValue: ResolveNameByValue = (value: V, strict: boolean = true) => {
        if (strict && !(value in valueNameMap)) {
            throw new Error(`Failed to parse "${value}" value from the "${JSON.stringify(nameValueMap)}" map`);
        }
        return valueNameMap[value];
    };

    interface ParseValue {
        (rawValue: any): V;

        <S extends boolean>(rawValue: any, strict: S): S extends true ? V : V | undefined;
    }

    const parseValue: ParseValue = (rawValue: any, strict: boolean = true) => nameValueMap[resolveNameByValue(rawValue, strict) as string];

    // TODO deep freeze the result object
    return Object.assign(
        {
            _: {resolveNameByValue, parseValue, names, values, nameValueMap},
        },
        nameValueMap,
    );
}


export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

}


export function LowerThan(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: LowerThanConstraint,
        });
    };
}

@ValidatorConstraint({name: 'LowerThan'})
export class LowerThanConstraint implements ValidatorConstraintInterface {

    validate(value: number, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value < relatedValue;
    }

}