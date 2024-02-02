using Dapper;
using Intel.BillingHub.Common.CostCenterModel;
using Intel.BillingHub.Common.GLaccountModel;
using Intel.BillingHub.Common.JsonResponseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Data.JVData
{
    public class JVData : IJVData
    {
        private readonly SCPR01DbContext _scpr01DbContext;

        public JVData(SCPR01DbContext scpr01DbContext)
        {
            _scpr01DbContext = scpr01DbContext;
        }

        public async Task<List<CostCenter>> GetAllCostCenter()
        {
            using (var con = _scpr01DbContext.GetConnection())
            {
                try
                {
                    var queryParameter = new DynamicParameters();
                    var query = (await con.QueryAsync<CostCenter>(DapperConstant.usp_getAllCostCenter, queryParameter, commandType: CommandType.StoredProcedure)).ToList();
                    return query;
                }
                catch (Exception Ex)
                {
                    JsonResponse? resp = new JsonResponse();
                    resp.id = null;
                    resp.status = 500;
                    resp.message = Ex.Message;
                    throw new Exception(Ex.Message);
                }
            }
        }

        public async Task<List<GLAccount>> GetAllGLAccount()
        {
            using (var con = _scpr01DbContext.GetConnection())
            {
                try
                {
                    var queryParameter = new DynamicParameters();
                    var query = (await con.QueryAsync<GLAccount>(DapperConstant.usp_getAllGLaccount, queryParameter, commandType: CommandType.StoredProcedure)).ToList();
                    return query;
                }
                catch (Exception Ex)
                {
                    JsonResponse? resp = new JsonResponse();
                    resp.id = null;
                    resp.status = 500;
                    resp.message = Ex.Message;
                    throw new Exception(Ex.Message);
                }
            }
        }
    }
}
