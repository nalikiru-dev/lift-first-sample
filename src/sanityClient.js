import { createClient } from '@sanity/client';

export default createClient({
  projectId: 'p8j89tkw',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',
  token: process.env.SANITY_AUTH_TOKEN,
});