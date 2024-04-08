import { prisma } from '../libs/prisma';

async function seed() {
  await prisma.event.create({
    data: {
      id: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'An event for programming lovers!',
      maximumAttendees: 120,
    },
  });

  const attendees = [
    {
      name: 'John Smith',
      email: 'john@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Alice Johnson',
      email: 'alice@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Bob Brown',
      email: 'bob@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Emily Davis',
      email: 'emily@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Michael Wilson',
      email: 'michael@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Sophia Martinez',
      email: 'sophia@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'David Anderson',
      email: 'david@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Emma Taylor',
      email: 'emma@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'William Thomas',
      email: 'william@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Olivia Hernandez',
      email: 'olivia@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'James Walker',
      email: 'james@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Isabella Young',
      email: 'isabella@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Daniel Rodriguez',
      email: 'daniel@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Charlotte White',
      email: 'charlotte@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Benjamin Lee',
      email: 'benjamin@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Ava Harris',
      email: 'ava@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Mason Clark',
      email: 'mason@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Mia Lewis',
      email: 'mia@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Ethan Baker',
      email: 'ethan@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Amelia Hall',
      email: 'amelia@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
    {
      name: 'Elijah Green',
      email: 'elijah@test.com',
      eventId: 'eeff8f07-5dfe-4332-ae53-04ddff1a4517',
    },
  ];

  for (const attendee of attendees) {
    await prisma.attendee.create({
      data: attendee,
    });
  }
}

seed().then(() => {
  console.log('Database seeded!');
  prisma.$disconnect();
});
