using Intel.BillingHub.Business.JVService;
using Intel.BillingHub.Common.CostCenterModel;
using Intel.BillingHub.Common.GLaccountModel;
using Intel.BillingHub.Common.JVFile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Intel.BillingHub.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class JVController : ControllerBase
    {
        private readonly IJVService _jVService;
        public JVController(IJVService jVService)
        {
            _jVService = jVService;
        }

        [HttpPost]
        public async Task<List<JVFileResponseModel>> ValidateJVFile(List<JVFileRequestModel> jVFileRequests)
        {
           return await _jVService.ValidateJVFile(jVFileRequests);
        }
    }
}
