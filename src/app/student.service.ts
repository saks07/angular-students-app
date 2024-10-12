import { Injectable } from '@angular/core';
import {
  Student,
  StudentPaginated,
  StudentsPagination,
  StudentTableHeading,
} from '../interfaces/student.interface';
import { IStudentService } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentService implements IStudentService {
  private baseUrl: string = 'http://localhost:3000/students';
  private LIMIT = 20;

  // Getters
  get pageLimit(): number {
    return this.LIMIT;
  }

  async getStudents(): Promise<StudentPaginated> {
    try {
      const query = this.buildPaginationQuery();
      const response = await fetch(`${this.baseUrl}${query}`);
      const {
        data,
        pages,
        items,
        prev,
        next,
        first,
        last,
      }: StudentsPagination = await response.json();
      return {
        data,
        pagination: {
          pages,
          items,
          prev,
          next,
          first,
          last,
        },
      };
    } catch (err: unknown) {
      console.error((err as Error).message);
      return {
        data: [],
        pagination: {
          pages: 0,
          items: 0,
          prev: null,
          next: null,
          first: null,
          last: null,
        },
      };
    }
  }

  buildTableHeading(): StudentTableHeading {
    return {
      firstName: 'first name',
      lastName: 'last name',
      email: 'email',
      courses: 'courses',
      commands: 'commands',
    };
  }

  private buildPaginationQuery(): string {
    const page = this.getPageNumber();
    return `?_page=${page.toString()}&_per_page=${this.pageLimit}`;
  }

  private getPageNumber(): number {
    const urlSearch = new URLSearchParams(location.search);
    return urlSearch.get('page') ? Number(urlSearch.get('page')) : 1;
  }

  async getStudent(id: string): Promise<Student | null> {
    try {
      if (!id) {
        throw new Error('Missing student id');
      }

      const response = await fetch(`${this.baseUrl}/${id}`);
      const data = await response.json();
      return data;
    } catch (err: unknown) {
      console.error((err as Error).message);
      return null;
    }
  }

  async createStudent(body: Student): Promise<Student | null> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (err: unknown) {
      console.error((err as Error).message);
      return null;
    }
  }

  async updateStudent(id: string, body: Student): Promise<Student | null> {
    try {
      if (!id) {
        throw new Error('Missing student id');
      }

      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (err: unknown) {
      console.error((err as Error).message);
      return null;
    }
  }

  async deleteStudent(id: string): Promise<Student | null> {
    try {
      if (!id) {
        throw new Error('Missing student id');
      }

      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (err: unknown) {
      console.error((err as Error).message);
      return null;
    }
  }
}
