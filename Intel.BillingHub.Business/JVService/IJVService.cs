using Intel.BillingHub.Common.CostCenterModel;
using Intel.BillingHub.Common.GLaccountModel;
using Intel.BillingHub.Common.JVFile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Business.JVService
{
    public interface IJVService
    {
        public Task<List<CostCenter>> GetAllCostCenter();
        public Task<List<GLAccount>> GetAllGLAccount();
        public Task<List<JVFileResponseModel>> ValidateJVFile(List<JVFileRequestModel> jVFileRequests);

    }
}
