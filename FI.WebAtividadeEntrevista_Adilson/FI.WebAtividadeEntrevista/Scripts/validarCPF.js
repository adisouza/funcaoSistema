function testarCPF(id) {
    let strCPF = $("#" + id).val();

    if (strCPF.includes(".")) {
        strCPF = strCPF?.replaceAll("-", "");
        strCPF = strCPF?.replaceAll(".", "");
    }

    let Soma;
    let Resto;
    var regex = new RegExp(/(\d)\1{8}/);

    if (regex.test(strCPF)) {
        $("#" + id).css("border", "1px solid red");
        if ($(`#${id} ~#infoCPF`)[0] == undefined) {
            document
                .getElementById(id)
                .insertAdjacentHTML("afterend", '<span style="color: red;text-align: center;padding-top: 2px" id="infoCPF">CPF inválido</span>');
        }
        return false;
    }

    Soma = 0;
    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) {
        $("#" + id).css("border", "1px solid red");
        if ($(`#${id} ~#infoCPF`)[0] == undefined) {
            document
                .getElementById(id)
                .insertAdjacentHTML("afterend", '<span style="color: red;text-align: center;padding-top: 2px" id="infoCPF">CPF inválido</span>');
        }
        return false;
    }

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) {
        $("#" + id).css("border", "1px solid red");
        if ($(`#${id} ~#infoCPF`)[0] == undefined) {
            document
                .getElementById(id)
                .insertAdjacentHTML("afterend", '<span style="color: red;text-align: center;padding-top: 2px" id="infoCPF">CPF inválido</span>');
        }
        return false;
    }

    $("#" + id).css("border", "1px solid #e5e6e7");
    $(`#${id} ~#infoCPF`).remove();
    return true;
}