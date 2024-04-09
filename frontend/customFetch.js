import tough from 'tough-cookie';

export const cookiejar = new tough.CookieJar();

async function customFetch(url, opts = {}) {
  const cookies = getCookies(url);

  const response = await fetch(url, {
    ...opts,
    headers: {
      ...opts.headers,
      cookies,
    },
  });
  console.log('Response status:', response.status);

  if (response.status === 401) {
    await refreshToken().catch((error) => {
      console.error(error.message);
      return;
    });
    return customFetch(url, opts);
  }

  saveCookies(response, url);

  return response;
}

async function refreshToken(url) {
  return new Promise(async (rs) => {
    const cookies = getCookies(url);

    console.log('Refreshing token');
    const response = await fetch('http://192.168.178.79:3000/auth/refresh', {
      method: 'POST',
      headers: {
        cookies,
      },
    });
    if (response.status !== 201) {
      throw new Error('Failed to refresh token');
    }
    console.log('Refresh response status:', response.status);
    saveCookies(response, url);
    rs();
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

export default customFetch;
