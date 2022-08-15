export interface PropertyValue {
  prop: string;
  value: unknown;
}

export type PropertyUpdate = PropertyValue | PropertyValue[];
