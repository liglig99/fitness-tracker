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
    saveCookies(response, response.config.url, (error) => {
      if (error) {
        console.log(response.headers);
        console.error('Failed to save cookies', error);
      }
    });
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
  instance
    .post('/auth/refresh', {}, { headers: { Cookie: cookies } })
    .then((response) => {
      console.log('Refresh response status:', response.status);
      saveCookies(response, url, (error) => {
        if (error) {
          console.log(response.headers);
          console.error('Failed to save cookies', error);
        }
      });
    })
    .catch((error) => {
      if (response.status !== 201) {
        throw new Error(`Failed to refresh token ${error}`);
      }
    });
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

function saveCookies(response, url, callback) {
  if (!response.headers['set-cookie']) {
    callback(null);
    return;
  }
  const cookies = response.headers['set-cookie'];
  let errorOccurred = false;
  cookies.forEach((cookie, index) => {
    cookiejar.setCookie(cookie, url, (e) => {
      if (e) {
        console.error('Failed to save cookie', error);
        errorOccurred = true;
      }

      // Call the callback after the last cookie has been processed
      if (index === cookies.length - 1) {
        callback(
          errorOccurred ? new Error('Failed to save some cookies') : null,
        );
      }
    });
  });
}

export default instance;
