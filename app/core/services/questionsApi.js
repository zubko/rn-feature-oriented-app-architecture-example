import apisauce from 'apisauce';

import createApiMonitor from './createApiMonitor';

export default function createQuestionsApi() {
  const api = apisauce.create({
    baseURL: 'https://opentdb.com/',
    timeout: 10000,
  });
  if (__DEV__) {
    api.addMonitor(createApiMonitor('questions api'));
  }
  return api;
}

export async function getQuestions(api, number) {
  const res = await api.get('api.php', {
    amount: number,
  });
  return res;
}
