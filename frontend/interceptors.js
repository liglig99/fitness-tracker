import tough from 'tough-cookie';
import axios from 'axios';

const cookiejar = new tough.CookieJar();
const instance = axios.create({
  baseURL: 'http://192.168.178.79:3000',
});

let isRefreshing = false;

// Request interceptor
instance.interceptors.request.use(async (config) => {
  const cookies = await getCookies(config.url);
  config.headers.Cookie = cookies;
  return config;
});

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    saveCookies(response, response.config.url);
    return response;
  },
  async (error) => {
    if (error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      await refreshToken(error.config.url).catch((error) => {
        console.error(error);
        isRefreshing = false;
        return Promise.reject(error);
      });
      isRefreshing = false;
      return instance(error.config);
    }
    return Promise.reject(error);
  },
);

async function refreshToken(url) {
  const cookies = getCookies(url);

  console.log('Refreshing token');
  const response = await instance.post(
    '/auth/refresh',
    {},
    { headers: { Cookie: cookies } },
  );
  if (response.status !== 201) {
    throw new Error('Failed to refresh token');
  }
  console.log('Refresh response status:', response.status);
  saveCookies(response, url);
}

function getCookies(url) {
  return new Promise((rs, rj) => {
    cookiejar.getCookies(url, (err, cookies) => {
      if (err) {
        rj(err);
        return;
      }

      rs(cookies || []);
    });
  });
}

function saveCookies(response, url) {
  if (!response.headers['set-cookie']) {
    return;
  }
  return new Promise((rs, rj) => {
    cookiejar.setCookie(response.headers['set-cookie'], url, (e, s) => {
      if (e) {
        rj(e);
        return;
      }

      rs(s);
    });
  });
}

export default instance;
