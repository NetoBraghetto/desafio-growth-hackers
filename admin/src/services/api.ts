import Axios from 'axios';

const api = Axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
  headers: {
    'X-Requested-With': 'XMlHttpRequest',
  },
});

export default api;
