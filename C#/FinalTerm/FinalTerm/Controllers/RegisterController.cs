using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using FinalTerm.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Net;

namespace FinalTerm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public RegisterController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpPost]
        public JsonResult insertUserAccount(Register Register)
        {
            string queryUser = @"
                           insert into [dbo].[User]
                           (ID, FirstName, LastName, Address, PhoneNumber, Email, RoleId)
                    values (@ID, @FirstName,@LastName,@Address,@PhoneNumber, @Email, @RoleId)
                            ";
            string queryAccount = @"
                           insert into [dbo].[Account]
                           (Username, Password, UserId)
                    values (@Username,@Password,@UserId)
                            ";
            int result = 0;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlTransaction objTrans = null;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                objTrans = myCon.BeginTransaction();
                SqlCommand myCommandUser = new SqlCommand(queryUser, myCon, objTrans);
                SqlCommand myCommandAccount = new SqlCommand(queryAccount, myCon, objTrans);
               try
                {
                    Guid idUser = Guid.NewGuid();
                    myCommandUser.Parameters.AddWithValue("@ID", idUser.ToString());
                    myCommandUser.Parameters.AddWithValue("@FirstName", Register.FirstName);
                    myCommandUser.Parameters.AddWithValue("@LastName", Register.LastName);
                    myCommandUser.Parameters.AddWithValue("@Address", Register.Address);
                    myCommandUser.Parameters.AddWithValue("@PhoneNumber", Register.PhoneNumber);
                    myCommandUser.Parameters.AddWithValue("@Email", Register.Email);
                    myCommandUser.Parameters.AddWithValue("@RoleId", Register.RoleId);
                    int resultUser = myCommandUser.ExecuteNonQuery();
                    int resultAccount = 0;
                    if (resultUser > 0)
                    {
                        Guid idAccount = Guid.NewGuid();
                        myCommandAccount.Parameters.AddWithValue("@ID", idAccount.ToString());
                        myCommandAccount.Parameters.AddWithValue("@UserName", Register.UserName);
                        myCommandAccount.Parameters.AddWithValue("@Password", Register.Password);
                        myCommandAccount.Parameters.AddWithValue("@UserId", idUser.ToString());
                        resultAccount = myCommandAccount.ExecuteNonQuery();
                    }
                    if (resultAccount > 0)
                    {
                        result = 1;
                        objTrans.Commit();
                    }
                        
               }
               catch (Exception ex)
               {
                    objTrans.Rollback();
               }
               finally 
               {
                    myCon.Close();
               }
            }
            return new JsonResult(result);
        }
    }
}
