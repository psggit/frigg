export function isoToNormalDate(isoDate) {
  const date = new Date(isoDate)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let mn = date.getMinutes()
  let s = date.getSeconds()

  if (h < 10) {
    h = '0' + h
  }
  if (mn < 10) {
    mn = '0' + mn
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (m < 10) {
    m = '0' + m;
  }

  return `${d}/${m}/${y} ${h} : ${mn}`
}
