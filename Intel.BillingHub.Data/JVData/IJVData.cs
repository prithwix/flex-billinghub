using Intel.BillingHub.Common.CostCenterModel;
using Intel.BillingHub.Common.GLaccountModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Data.JVData
{
    public interface IJVData
    {
        public Task<List<CostCenter>> GetAllCostCenter();
        public Task<List<GLAccount>> GetAllGLAccount();

    }
}
