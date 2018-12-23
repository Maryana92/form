let forms = document.getElementsByTagName('form');
for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', validator);
}

var rules = {
    required: function (el) {
        let elem = el.nextElementSibling;
        if (el.value != '') {
            el.classList.add('success');
            el.classList.remove('error');
            let reqText = "*Its ok.";
            elem.innerHTML = reqText;
            return true;
        } else {
            el.classList.add('error');
            el.classList.remove('success');
            let reqText = "*This field is required.";
            elem.innerHTML = reqText;
        }
    },
    email: function (el) {
        if (el.value != '') {
            let reg = /\S+@\S+\.\S+/;
            let elem = el.nextElementSibling;
            if (reg.test(el.value)) {
                el.classList.add('success');
                el.classList.remove('error');
                let reqText = "*Its ok.";
                elem.innerHTML = reqText;
                return true;
            } else {
                el.classList.add('error');
                el.classList.remove('success');
                let reqText = "*Email address is not valid.";
                elem.innerHTML = reqText;
            }
        }
    },
    tabu: function (el) {
        if (el.value != '') {
            let reg = /'|"/;
            let elem = el.nextElementSibling;
            if (reg.test(el.value)) {
                el.classList.add('error');
                el.classList.remove('success');
                let reqText = "*You can't use these characters \' \" .";
                elem.innerHTML = reqText;

            } else {
                el.classList.add('success');
                el.classList.remove('error');
                let reqText = "*Its ok.";
                elem.innerHTML = reqText;
                return true;
            }
        } else {return true;}
    },
    checkSelect: function (el) {
        let elements = el.options[el.selectedIndex];
        let elem = el.nextElementSibling;
        if (elements.value == "") {
            el.classList.remove('success');
            el.classList.add('error');
            let reqText = "*Please, select a country.";
            elem.innerHTML = reqText;
        } else {
            el.classList.remove('error');
            el.classList.add('success');
            let reqText = "*Its ok.";
            elem.innerHTML = reqText;
            return true;
        }
    },
    checkChecked: function (el) {
        let rad = document.getElementsByName('inlineRadioOptions');
        let b = document.getElementById('gender');
        //let elem = document.getElementById('mes');
        for (let i = 0; i < rad.length; i++) {
            if (rad[i].checked) {
                b.classList.remove('error');
                b.classList.add('success');
                return true;
                // let reqTextp = "*Its ok.";
                //   elem.innerHTML = reqTextp;
            } else {
                b.classList.remove('succes');
                b.classList.add('error');
                //  let reqTextn = "*Please, select something.";
                //  elem.innerHTML = reqTextn;
            }
        }
    },
    validDate: function (el) {
        if (el.value != '') {
            let reg = /([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/;
            let elem = el.nextElementSibling;
            if (reg.test(el.value)) {
                el.classList.add('success');
                el.classList.remove('error');
                let reqText = "*Its ok.";
                elem.innerHTML = reqText;
                return true;
            } else {
                el.classList.add('error');
                el.classList.remove('success');
                let reqText = "*Date is not valid.";
                elem.innerHTML = reqText;
            }
        }
    }
}

function showErrors(arr) {
    console.log(arr);
}


function validator(e) {

    let errors = [];
    let inputs = document.getElementsByClassName('needValidation');
    console.log(inputs);
    for (let i = 0; i < inputs.length; i++) {
        let rulesList = inputs[i].dataset.rule;
        rulesList = rulesList.split(' ');
        for (let j = 0; j < rulesList.length; j++) {
            if (rulesList[j] in rules) {
                if (!rules[rulesList[j]](inputs[i])) {
                    errors.push({
                        name: inputs[i].id,
                        error: rulesList[j]
                    });
                }
            }

        }
    }
    if (errors.length > 0) {
        e.preventDefault();
        showErrors(errors);
    } else {
       alert ('Validation passed!')
    }

}
