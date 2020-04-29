var validation_result = [false, false, false];

$("#inputName").keyup(function(){
  setTimeout(validate_name(), 1 * 1000);
});

$("#inputPhone").keyup(function(){
  setTimeout(validate_phone(), 1 * 1000);
});

$("#inputAddress").keyup(function(){
  setTimeout(validate_address(), 1 * 1000);
});

function validate_name() {
  var name = $("#inputName").val();
  if (!/[A-zА-я\s']+$/.test(name)) {
    $(".name-help-block").css("display", "inline-block");
    validation_result[0] = false;
  } else {
    $(".name-help-block").css("display", "none");
    validation_result[0] = true;
  }
}

function validate_phone() {
  var phone = $("#inputPhone").val();
  if (phone.length != 13 || phone.slice(0,4) !== "+380") {
    $(".telephone-help-block").css("display", "inline-block");
    validation_result[1] = false;
  } else {
    $(".telephone-help-block").css("display", "none");
    validation_result[1] = true;
  }
}

function validate_address() {
  var re = /[A-zА-я\s0-9'єЄ]+$/;
  var address = $("#inputAddress").val();
  if (!re.test(address) && address.length === 0) {
    $(".address-help-block").css("display", "inline-block");
    validation_result[2] = false;
  } else {
    $(".address-help-block").css("display", "none");
    validation_result[2] = true;
  }
}

function correctInput() {
  var result = true;
  validate_name(); validate_phone(); validate_address();
  validation_result.forEach(function(input) {
    if (!input) {
      result = false;
    }
  });
  return result;
}

exports.correctInput = correctInput;