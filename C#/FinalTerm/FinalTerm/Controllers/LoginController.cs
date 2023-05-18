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
namespace FinalTerm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public LoginController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpPost]
        public JsonResult Login(Account account)
        {
            string query = @"
                            select [dbo].[User].Id AS UserId , Account.Username, [dbo].[User].IsActive, Role.Type 
                            from Account inner join [dbo].[User] ON Account.UserId = [dbo].[User].Id
                               inner join Role ON Role.Id = [dbo].[User].RoleId
                              WHERE Username =  @Username AND Password = @Password
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Username", account.Username);
                    myCommand.Parameters.AddWithValue("@Password", account.Password);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}
