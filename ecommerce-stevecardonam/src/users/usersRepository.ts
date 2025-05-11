import { Injectable } from '@nestjs/common';

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};

@Injectable()
export class UserRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Elm Street',
      phone: '+1-202-555-0101',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'securePass!45',
      address: '456 Oak Avenue',
      phone: '+44-20-7946-0958',
      country: 'UK',
      city: 'London',
    },
    {
      id: 3,
      email: 'maria.lopez@example.com',
      name: 'María López',
      password: 'maria1234',
      address: '789 Calle Principal',
      phone: '+34-91-123-4567',
      country: 'Spain',
      city: 'Madrid',
    },
    {
      id: 4,
      email: 'akihiko.tanaka@example.com',
      name: 'Akihiko Tanaka',
      password: 'tanaka!@#2025',
      address: '101 Sakura Lane',
      phone: '+81-3-1234-5678',
      country: 'Japan',
      city: 'Tokyo',
    },
    {
      id: 5,
      email: 'no.country@example.com',
      name: 'Alex Gray',
      password: 'grayArea2025',
      address: '999 Mystery Blvd',
      phone: '+1-404-555-0199',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
