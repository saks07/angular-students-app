export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  courses: number[];
}

export interface StudentsPagination {
  data: Student[];
  pages: number;
  prev: number | null;
  next: number | null;
  last: number | null;
  first: number | null;
  items: number;
}

export interface StudentPaginated {
  data: Student[];
  pagination: StudentPagination;
}

export interface StudentPagination {
  pages: number;
  prev: number | null;
  next: number | null;
  last: number | null;
  first: number | null;
  items: number;
}

export interface StudentTableHeading {
  firstName: string;
  lastName: string;
  email: string;
  courses: string;
  commands: string;
}
