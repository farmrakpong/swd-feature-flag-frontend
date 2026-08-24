export type Operator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'LESS_THAN'
  | 'GREATER_THAN'
  | 'LESS_THAN_EQUAL'
  | 'GREATER_THAN_EQUAL'
  | 'CONTAINS'
  | 'STARTS_WITH'
  | 'ENDS_WITH'
  | 'IN_LIST'
  | 'PRESENT'
  | 'NOT'



export interface OperatorOption {
  label: string
  value: Operator
}

export const operatorOptions: OperatorOption[] = [
  {
    label: 'Equals To',
    value: 'EQUALS',
  },
  {
    label: 'Not Equals To',
    value: 'NOT_EQUALS',
  },
  {
    label: 'Less Than',
    value: 'LESS_THAN',
  },
  {
    label: 'Greater Than',
    value: 'GREATER_THAN',
  },
  {
    label: 'Less Than Equal To',
    value: 'LESS_THAN_EQUAL',
  },
  {
    label: 'Greater Than Equal To',
    value: 'GREATER_THAN_EQUAL',
  },
  {
    label: 'Contains',
    value: 'CONTAINS',
  },
  {
    label: 'Starts With',
    value: 'STARTS_WITH',
  },
  {
    label: 'Ends With',
    value: 'ENDS_WITH',
  },
  {
    label: 'In a List',
    value: 'IN_LIST',
  },
  {
    label: 'Present',
    value: 'PRESENT',
  },
  {
    label: 'Not',
    value: 'NOT',
  },
]