using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Helpers
{
    public class EncryptionUtility
    {
        public static string Decrypt(byte[] bytData, string externalKey)
        {
            var crypto = new RijndaelManaged();
            try
            {
                var ms = new MemoryStream(bytData, 0, bytData.Length);
                byte[] bytKey = Encoding.UTF8.GetBytes(externalKey);
                crypto.Key = bytKey;
                crypto.IV = bytKey;
                ICryptoTransform encrypto = crypto.CreateDecryptor();
                var cs = new CryptoStream(ms, encrypto, CryptoStreamMode.Read);
                var sr = new StreamReader(cs);
                string ret = sr.ReadToEnd();
                sr.Close();
                return ret;
                //return sr.ReadToEnd();  
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }

        public static string GetConnectionString(string protectedString, string externalKey)
        {
            return Decrypt(Convert.FromBase64String(protectedString), externalKey);
        }

        public static string Encrypt(string dataToEncrypted, string externalKey)
        {
            const int KeySize = 128;

            // create our crypto provider and initialize it with specific values
            var crypto = new RijndaelManaged();
            crypto.KeySize = KeySize;
            //string strKey = GetKey(keyToUse);
            crypto.Mode = CipherMode.CBC;
            crypto.Padding = PaddingMode.PKCS7;
            byte[] bytOut;

            // get the IV and key 
            crypto.Key = Encoding.UTF8.GetBytes(externalKey);
            crypto.IV = Encoding.UTF8.GetBytes(externalKey);

            // turn the message into bytes
            // use UTF8 encoding to ensure that Java can read in the file properly
            byte[] plainBytes = Encoding.UTF8.GetBytes(dataToEncrypted.ToCharArray());

            // Encrypt the Text Message using AES (Rijndael) (Symmetric algorithm)
            ICryptoTransform encrypto = crypto.CreateEncryptor();
            var ms = new MemoryStream();
            var cs = new CryptoStream(ms, encrypto, CryptoStreamMode.Write);
            try
            {
                cs.Write(plainBytes, 0, plainBytes.Length);
                cs.FlushFinalBlock();
                bytOut = ms.ToArray();
            }
            finally
            {
                ms.Close();
                cs.Close();
            }

            String strOut = Convert.ToBase64String(bytOut);
            return strOut;
            //return bytOut;
        }
    }
}
