import { buildEnumBundle } from "../middlewares/validator-utils";

export const DEVICE_TYPE = buildEnumBundle({
    SAS360_CON: 0,
    SAS360_TAG_DRIVER: 1,
    SAS360_TAG_MAN: 2,
    SAS360_TAG_HEAVY_VEHICLE: 3,
    SAS360_TAG_LIGHT_VEHICLE: 4,
});