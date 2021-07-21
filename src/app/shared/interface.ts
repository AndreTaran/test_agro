export interface VehicleCode {
  "id": string;
  "shortId": string;
  "code1c": string;
  "organizationId"?: string;
  "vehicleId"?: string;
  "aggregateId"?: string;
  "drivers"?: Array<any>;
  "deleted"?: boolean;
  "repv"?: number;
  Organization?: Organization;
  Drivers?: Employee[];
  Vehicle?: Vehicle;
  Aggregate?: Vehicle;
  Department?: Department;
}

export interface Organization {
  "id": string;
  "parentId"?: string;
  "level"?: number;
  "name"?: string;
  "code1c"?: string;
  "villageId"?: string;
  "address"?: string;
  "deleted"?: boolean;
  "repv"?: number;
}

export interface Employee {
  "id"?: string;
  "name"?: string;
}

export interface Vehicle{
  "id": string;
  "name": string;
  "organizationId"?: string;
  "departmentId"?: string;
  "contragentId"?: string;
  Organization?: Organization;
  Department?: Department;
  Contragent?: Contragent;
}

export interface Department {
  "id": string;
  "name"?: string;
  "organizationId": string;
}

export interface Contragent {
  "id": string;
  "name"?: string;
  "organizationId": string;
}
