var _id = 0;
$(document).ready(function () {
    $('input.NrCPF').mask('999.999.999-99');
    $("button.btnAlterar").on("click", function (e) {
        e.preventDefault()
        AtualizarBenefinciario(e)
    })
    $("button.btnExcluir").on("click", function (e) {
        e.preventDefault()
        ExcluirBenefinciario(e)
    })
})
function AtualizarBenefinciario(e) {
    let id = 0;
    if (obj) {
        id = obj.Id
    }
    id = $("#" + e.target.id).attr("data-alterar")
    if (!testarCPF('CPF_' + id)) {
        return alert("CPF inválido!")
    }
    e.preventDefault()
    $.ajax({
        url: '/beneficiario/Alterar',
        method: 'POST',
        data: {
            "Nome": $("#Nome_" + id).val(), "CPF": $("#CPF_" + id).val(), "Id": id, "IdCliente": obj.Id
        },
        success: function (data) {
            return $('.modal-body').html(data);
        },
        error: function () {
            alert("There is some problem in the service!")
        }
    });
}
function ExcluirBenefinciario(e) {
    let id = 0;
    if (obj) {
        id = obj.Id
    }
    id = $("#" + e.target.id).attr("data-excluir")

    e.preventDefault()
    $.ajax({
        url: '/beneficiario/Excluir',
        method: 'POST',
        data: { "Id": id },
        success: function (data) {
            return $('.modal-body').html(data);
        },
        error: function () {
            alert("There is some problem in the service!")
        }
    });
}
