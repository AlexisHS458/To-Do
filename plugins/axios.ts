export default function ({ $axios }: any, inject: any) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Authorization:
          "Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd",
      },
    },
  });

  // Set baseURL to something different
  api.setBaseURL("https://ecsdevapi.nextline.mx/vdev/tasks-challenge/");

  // Inject to context as $api
  inject("api", api);
}
