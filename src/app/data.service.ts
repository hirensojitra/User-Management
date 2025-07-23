import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [];
    const firstNames = ['Rahul', 'Priya', 'Amit', 'Neha', 'Sanjay', 'Deepa', 'Vikas', 'Pooja', 'Rajesh', 'Anjali', 'Gaurav', 'Swati', 'Manish', 'Kavita', 'Alok', 'Shruti', 'Vivek', 'Meena', 'Ashok', 'Ritu'];
    const lastNames = ['Sharma', 'Singh', 'Kumar', 'Yadav', 'Gupta', 'Reddy', 'Patel', 'Mehta', 'Jain', 'Shah', 'Verma', 'Dubey', 'Tiwari', 'Mishra', 'Chauhan', 'Malhotra', 'Agarwal', 'Srivastava', 'Goel', 'Bansal'];
    const domains = ['gmail.com', 'yahoo.in', 'theopeneyes.com', 'gov.in'];
    const roles = ['Admin', 'Manager', 'User'];
    const statuses = ['Active', 'Inactive'];

    for (let i = 1; i <= 50; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
      const phoneNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      const phone = `+91-${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, 10)}`; // Indian phone number format
      const role = roles[Math.floor(Math.random() * roles.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      users.push({ id: i, name, email, phone, role, status });
    }

    return { users };
  }
}
