export function $_GET() {
  let url = window.document.location.href.toString();
  let u = url.split('?');
  if (typeof u[1] == 'string') {
    u = u[1].split('&')
    let get = {};
    for (let i in u) {
      let j = u[i].split('=');
      get[j[0]] = j[1]
    }
    return get;
  } else {
    return {};
  }
}