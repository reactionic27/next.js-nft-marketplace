import axios from 'axios';

interface ObjectProps {
  [key: string]: unknown;
}

interface ApiProps {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload: ObjectProps;
}

export const api = async ({ url, method, payload }: ApiProps) => {
  const { data } = await axios({
    method,
    url,
    headers: {},
    data: payload,
  });
  return data;
};
