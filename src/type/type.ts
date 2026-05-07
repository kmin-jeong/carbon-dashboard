export type GhgEmission = {
  yearMonth?: string;
  source?: string;
  emissions?: number;
};

export type Company = {
  id: string;
  name: string;
  country: string; // 나라코드
  emissions: GhgEmission[];
};

export type Country = {
  code: number;
  name: string;
};

export type Post = {
  id: string;
  title: string; // activity type
  resourceUid: string; // unit
  dateTime: string; // date
  content: string; // description
};

export interface ActivityType {
  value: string;
  label: string;
  units: string[];
}
