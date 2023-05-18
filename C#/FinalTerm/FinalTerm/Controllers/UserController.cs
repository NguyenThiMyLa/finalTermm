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

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public UserController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()

        {
            string query = @"
                            select Id, FirstName, LastName, Address, PhoneNumber, Email, RoleId, IsActive
                            from
                            [dbo].[User]
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpGet("searchUser/{dataSearch}")]
        public JsonResult SearchUser(string dataSearch)

        {
            string query = @"
                            select Id, FirstName, LastName, Address, PhoneNumber, Email, RoleId, IsActive
                            from [dbo].[User]
                            where 1=1
                            ";
            if (dataSearch != null && dataSearch != " ")
            {
                query = query + " and FirstName like '%@dataSearch%' or LastName like '%@dataSearch%' or Email like '%@dataSearch%' ";
            }
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    if (dataSearch != null && dataSearch != " ")
                    {
                        myCommand.Parameters.AddWithValue("@dataSearch", dataSearch);
                    }
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
        [HttpGet("getStaff")]
        public JsonResult GetStaff()

        {
            string query = @"
                            select [dbo].[User].Id, FirstName, LastName, Address, PhoneNumber, Email, RoleId, IsActive
                            from [dbo].[User] inner join [dbo].[Role] ON [dbo].[User].RoleId = Role.Id 
                            where RoleId='C572C4B8-2D93-4730-B519-3A2E028FD5D0'
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(User emp)
        {
            string query = @"
                           insert into [dbo].[User]
                           (Id, FirstName, LastName, Address, PhoneNumber, Email, RoleId, IsActive)
                    values (@Id,@FirstName,@LastName,@Address, @PhoneNumber, @Email, @RoleId, @IsActive)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", emp.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", emp.LastName);
                    myCommand.Parameters.AddWithValue("@Address", emp.Address);
                    myCommand.Parameters.AddWithValue("@PhoneNumber", emp.PhoneNumber);
                    myCommand.Parameters.AddWithValue("@Email", emp.Email);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(User emp)
        {
            string query = @"
                           update [dbo].[User]
                           set
                            FirstName=@FirstName,
                            LastName=@LastName,
                            Address=@Address,
                            PhoneNumber=@PhoneNumber,
                            Email=@Email
                            where Id=@Id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", emp.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", emp.LastName);
                    myCommand.Parameters.AddWithValue("@Address", emp.Address);
                    myCommand.Parameters.AddWithValue("@PhoneNumber", emp.PhoneNumber);
                    myCommand.Parameters.AddWithValue("@Email", emp.Email);
                    myCommand.Parameters.AddWithValue("@Id", new Guid(emp.Id));
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpGet("{id}")]
        public JsonResult GetId(string id)
        {
            string query = @"
                            select * from
                            [dbo].[User]
                            ";
            if (id != null && id != "")
            {
                query += " where Id = @id";
            }
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    if (id != null && id != "")
                    {
                        myCommand.Parameters.AddWithValue("@Id", new Guid(id));
                    }
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            string queryAccount = @"
                           delete from [dbo].[Account]
                            where UserId=@Id
                            ";
            string queryUser = @"
                           delete from [dbo].[User]
                            where Id=@Id
                            ";
            int result = 0;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlTransaction objTrans = null;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                objTrans = myCon.BeginTransaction();
                SqlCommand myCommandAccount = new SqlCommand(queryAccount, myCon, objTrans);
                SqlCommand myCommandUser = new SqlCommand(queryUser, myCon, objTrans);
                try
                {
                    myCommandAccount.Parameters.AddWithValue("@Id", id);
                    int resultAccount = myCommandAccount.ExecuteNonQuery();
                    int resultUser = 0;
                    if (resultAccount > 0)
                    {
                        myCommandUser.Parameters.AddWithValue("@Id", id);
                        resultUser = myCommandUser.ExecuteNonQuery();
                    }
                    if (resultUser > 0)
                    {
                        result = 1;
                        objTrans.Commit();
                    }
                    else
                    {
                        objTrans.Rollback();
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
            return new JsonResult("Deleted Successfully");
        }
    }
}