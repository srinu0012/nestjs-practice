import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  name: string;
  id: number;
}

@Injectable()
export class TestService {
  public users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User {
    const userData = <User>this.users.find((val) => val.id == id);

    if (userData && Object?.entries(userData)?.length > 0) {
      return userData;
    }
    throw new NotFoundException({ error: 'dummy error' }, 'user not found');
  }

  addUser(user: User): User {
    this.users.push(user);
    return user;
  }

  deleteUser(id: number): string {
    this.users = <User[]>this.users.filter((val) => val.id != id);
    console.log(this.users);

    return 'Deleted Successfully';
  }

  updateUsernameById(id: number, name: string): User {
    console.log(name);

    this.users = <User[]>this.users.map((val: User) => {
      if (val.id == id) {
        val.name = name;
      }
      return val;
    });
    return { id, name };
  }
}
