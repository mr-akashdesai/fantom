export default {
  homepage: () => '/homepage',
  screenRecorder: () => '/screen-recorder',
  dictionary: () => '/dictionary',
  colorPicker: () => '/color-picker',
  weather: () => '/weather',
  sports: () => '/sports',
  entertainment: () => '/entertainment',
  movieDetails: (movieId: string | number) => `/entertainment/movie-details/${movieId}`,
  seriesDetails: (seriesId: string | number) => `/entertainment/series-details/${seriesId}`,
  tempMail: () => '/temp-mail',
  tempMailViewMessage: (mailId: string | number) => `/temp-mail/view/${mailId}`
}
