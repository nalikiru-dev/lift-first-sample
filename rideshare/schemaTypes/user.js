// sanity/schemas/user.js
export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
      },
      // Add more fields as needed
    ],
  };