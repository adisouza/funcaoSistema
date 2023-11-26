using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using FI.AtividadeEntrevista;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {

        public ActionResult Index([Bind(Include = "IdCliente")] long IdCliente = 0)
        {
            List<BeneficiarioModel> ben = new List<BeneficiarioModel>();
            if (IdCliente > 0)
            {
                BeneficiarioList(IdCliente).ForEach(item => ben.Add(new BeneficiarioModel()
                {
                    Id = item.Id,
                    IdCliente = item.IdCliente,
                    Nome = item.Nome,
                    CPF = item.CPF
                }));
            }
            return PartialView(ben.ToList());
        }

        [HttpGet]
        public ActionResult Incluir([Bind(Include = "IdCliente")] long IdCliente = 0)
        {
            return PartialView(new BeneficiarioModel() { IdCliente = IdCliente });
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();
            if (model.IdCliente == 0)
            {
                return Json("Necessario primeiramente cadastrar um cliente!");
            }
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                var _cpf = model.CPF.Replace(".", string.Empty).Replace("-", string.Empty);
                if (bo.VerificarExistencia(_cpf, model.Id))
                {
                    return Json("CPF já cadastrado");
                }
                if (!Util.IsCpf(_cpf))
                {
                    return Json("CPF invalido");
                }
                model.Id = bo.Incluir(new Beneficiario()
                {
                    IdCliente = model.IdCliente,
                    Nome = model.Nome,
                    CPF = _cpf
                });


                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                var _cpf = model.CPF.Replace(".", string.Empty).Replace("-", string.Empty);
                if (bo.VerificarExistencia(_cpf, model.Id))
                {
                    return Json("CPF já cadastrado");
                }
                if (!Util.IsCpf(_cpf))
                {
                    return Json("CPF invalido");
                }
                bo.Alterar(new Beneficiario()
                {
                    Id = model.Id,
                    Nome = model.Nome,
                    IdCliente = model.Id,
                    CPF = _cpf
                });

                return Json("Cadastro alterado com sucesso");
            }
        }
        [HttpPost]
        public JsonResult Excluir(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {

                bo.Excluir(id);

                return Json("Cadastro excluido com sucesso");
            }
        }

        [HttpPost]
        public List<Beneficiario> BeneficiarioList(long id)
        {
            try
            {
                List<Beneficiario> beneficiarios = new BoBeneficiario().Pesquisa(id);
                return beneficiarios;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}