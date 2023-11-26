$(document).ready(function () {
    $('#NrCPF').mask('999.999.999-99');
    $("#btnIncluir").on("click", function (e) {
        e.preventDefault()
        IncluirBenefinciario(e)
    })
})
function IncluirBenefinciario(e) {
    let id = 0;
    if (obj) {
        id = obj.Id
    }
    if (id === 0) {
        return alert("Necessario primeiramente cadastrar um cliente!")
    }
    if (!testarCPF('NrCPF')) {
        return alert("CPF inválido!")
    }
    e.preventDefault()
    $.ajax({
        url: '/beneficiario/Incluir',
        method: 'POST',
        data: { "Nome": $("#NmBeneficiario").val(), "CPF": $("#NrCPF").val(), "idCliente": id },
        success: function (data) {
            return $('.modal-body').html(data);
        },
        error: function () {
            alert("There is some problem in the service!")
        }
    });
}
