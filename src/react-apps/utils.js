export function validateNumType(keyCode) {
  let allowed = [ 8, 46, 37, 39, 9, 189 ]
  const res = allowed.indexOf(keyCode) > -1 || (keyCode >=48 && keyCode <=57)
  console.log(res)
  return res
}

export function checkCtrlA(e) {
  if (e.ctrlKey) {
    if (e.keyCode == 65 || e.keyCode == 97) {
      return true
    }
  }
  return false
}

export function checkCtrlV(e) {
  if (e.ctrlKey) {
    console.log("ctrl+v")
    if (e.keyCode == 86 || e.keyCode == 118) {
      return true
    }
  }
  return false
}