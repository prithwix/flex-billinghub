using Intel.BillingHub.Common.CostCenterModel;
using Intel.BillingHub.Common.GLaccountModel;
using Intel.BillingHub.Common.JVFile;
using Intel.BillingHub.Data.JVData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Business.JVService
{
    public class JVService : IJVService
    {
        private readonly IJVData _jvData;
        public JVService(IJVData jvData)
        {
            _jvData = jvData;
        }
        public async Task<List<CostCenter>> GetAllCostCenter()
        {
            return await _jvData.GetAllCostCenter();
        }

        public async Task<List<GLAccount>> GetAllGLAccount()
        {
            return await _jvData.GetAllGLAccount();
        }

        public async Task<List<JVFileResponseModel>> ValidateJVFile(List<JVFileRequestModel> jVFileRequests)
        {
            var allCostCenter = await GetAllCostCenter();
            var allGLAccount = await GetAllGLAccount();
            var ErrorMessageList = new List<JVFileResponseModel>();

            foreach (var jVFileRequest in jVFileRequests)
            {
                var findCostCenter = allCostCenter.Find(costCenter => costCenter.CostCenterId.Equals(jVFileRequest.CostCenter));
                if (findCostCenter != null && !findCostCenter.IsActive)
                {
                    ErrorMessageList.Add(new JVFileResponseModel
                    {
                        ErrorMessage = "Inactive Cost Center = " + findCostCenter.CostCenterId
                    });
                }
                else if (findCostCenter != null && !findCostCenter.faEmail.Equals(jVFileRequest.FAEmail))
                {
                    ErrorMessageList.Add(new JVFileResponseModel
                    {
                        ErrorMessage = "Incorrect Finance Analyst = " + jVFileRequest.FAEmail
                    });
                }
                else if (findCostCenter != null && !findCostCenter.CompanyCode.Equals(jVFileRequest.CompanyCode))
                {
                    ErrorMessageList.Add(new JVFileResponseModel
                    {
                        ErrorMessage = "Incorrect Company Code = " + jVFileRequest.CompanyCode
                    });
                }
                else if (findCostCenter == null)
                {
                    ErrorMessageList.Add(new JVFileResponseModel
                    {
                        ErrorMessage = "Invalid Cost Center = " + jVFileRequest.CostCenter
                    });
                }

                var findGLAccount = allGLAccount.Find(GLAccount => GLAccount.GLAccountId.Equals(jVFileRequest.GLAccount));
                if (findGLAccount != null && !findGLAccount.IsActive)
                {
                    ErrorMessageList.Add(new JVFileResponseModel
                    {
                        ErrorMessage = "Inactive GL account = " + findGLAccount.GLAccountId
                    });
                }
                else if (findGLAccount == null)
                {
                    ErrorMessageList.Add(new JVFileResponseModel
                    {
                        ErrorMessage = "Invalid GL account = " + jVFileRequest.GLAccount
                    });
                }

            }

            return ErrorMessageList;

        }
    }
}
