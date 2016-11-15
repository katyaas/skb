export default function task2c(username) {
  const re = new RegExp('@?(https?:)?(\/\/)?(www.)?((.)[^\/]*\/)?(@)?([a-zA-Z0-9\._]*)', 'i');
  const parsed = username.match(re);
  console.log(parsed);
  if (parsed && parsed[7]) {
    return '@' + parsed[7];
  }
  return 'Invalid username';
}


