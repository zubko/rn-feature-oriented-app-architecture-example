function urlWithoutBase(response) {
  const {
    config: { url, baseURL },
  } = response;
  return url.substr(baseURL.length);
}

export default name => response => {
  // eslint-disable-next-line no-console
  console.log(
    `${name.toUpperCase()}: ${response.config.method.toUpperCase()} ${urlWithoutBase(
      response
    )}`,
    {
      config: response.config,
      data: response.data,
      response,
    }
  );
};
