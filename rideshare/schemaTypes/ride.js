// sanity/schemas/ride.js
export default {
    name: 'ride',
    title: 'Ride',
    type: 'document',
    fields: [
      {
        name: 'driver',
        title: 'Driver',
        type: 'reference',
        to: [{ type: 'user' }],
      },
      {
        name: 'pickupLocation',
        title: 'Pickup Location',
        type: 'geopoint',
      },
      {
        name: 'dropoffLocation',
        title: 'Dropoff Location',
        type: 'geopoint',
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            { title: 'Requested', value: 'requested' },
            { title: 'Accepted', value: 'accepted' },
            { title: 'Completed', value: 'completed' },
          ],
        },
      },
      // Add more fields as needed
    ],
  };