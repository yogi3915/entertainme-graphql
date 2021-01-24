import { defaultMergedResolver } from 'apollo-server';
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
  });

export default instance