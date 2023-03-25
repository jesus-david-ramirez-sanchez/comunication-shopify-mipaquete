const { originCors } = process.env;
export default {
  originCors,
  optionsSuccessStatus: 200,
  method: 'GET, POST',
};
