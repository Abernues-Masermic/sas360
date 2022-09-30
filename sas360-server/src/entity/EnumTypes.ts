import { buildEnumBundle } from "../middlewares/validator-utils";

export enum ENTITY_TYPE {
    DEVICE = 'DEVICE',
    EVENT = 'EVENT',
    GEODATA = 'GEODATA',
    INSTALLATION = 'INSTALLATION',
    USER = 'USER'
}

export const DEVICE_TYPE = buildEnumBundle({
    SAS360_CON: 0,
    SAS360_TAG_DRIVER: 1,
    SAS360_TAG_MAN: 2,
    SAS360_TAG_HEAVY_VEHICLE: 3,
    SAS360_TAG_LIGHT_VEHICLE: 4,
});

export const ROLE_TYPE = buildEnumBundle({
    OPERATOR: 0,
    ADMIN: 1,
    SUPERADMIN: 2,
});

export const SEVERITY_TYPE = buildEnumBundle({
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
    CRITICAL: 3,
});

export const STATE_TYPE = buildEnumBundle({
    ACTIVE: 0,
    CLOSED: 1,
    ARCHIVED: 2,
});
