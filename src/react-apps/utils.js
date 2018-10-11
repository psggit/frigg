export function validateNumType(keyCode) {
  let allowed = [ 8, 46, 37, 39, 9, 189 ]
  const res = allowed.indexOf(keyCode) > -1 || (keyCode == 190) || (keyCode >=48 && keyCode <=57) || (keyCode >=96 && keyCode <= 105)
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
    if (e.keyCode == 86 || e.keyCode == 118) {
      return true
    }
  }
  return false
}

export function validateFloatKeyPress(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode;
  var number = evt.target.value.split('.');
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }
  //just one dot
  if(number.length>1 && charCode == 46){
       return false;
  }
  //get the carat position
  var caratPos = getSelectionStart(evt.target);
  var dotPos = evt.target.value.indexOf(".");
  if( caratPos > dotPos && dotPos>-1 && (number.length > 0 && number[1].length > 1)){
      return false;
  }
  return true;
}

export function getSelectionStart(o) {
  if (o.createTextRange) {
    var r = document.selection.createRange().duplicate()
    r.moveEnd('character', o.value.length)
    if (r.text == '') return o.value.length
    return o.value.lastIndexOf(r.text)
  } else return o.selectionStart
}