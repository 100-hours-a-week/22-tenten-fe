export type Course =
  | 'ALL'
  | 'PANGYO_1'
  | 'JEJU_1'
  | 'PANGYO_2'
  | 'JEJU_2'
  | 'JEJU_3';

export const CourseList = [
  'ALL',
  'PANGYO_1',
  'PANGYO_2',
  'JEJU_1',
  'JEJU_2',
  'JEJU_3',
] as const;
