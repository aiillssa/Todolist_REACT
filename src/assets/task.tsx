export type task = {
  name: string;
  dueDate?: Date;
  notes?: string;
  isChecked: boolean;
  _id: any;
};

export type taskUI = {
  name: string;
  dueDate?: Date;
  notes?: string;
  id: any;
};
