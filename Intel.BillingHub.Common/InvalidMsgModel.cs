using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Common
{
    public interface InvalidMsgModel
    {
        public bool? Invalid { get; set; }
        public string? InvalidMsg { get; set; }
    }
}
