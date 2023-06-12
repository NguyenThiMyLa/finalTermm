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

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MerchandiseController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public MerchandiseController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select * from
                            dbo.Merchandise
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


        [HttpGet("{id}")]
        public JsonResult GetId(string id)
        {
            string query = @"
                            select * from
                            dbo.Merchandise
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

        [HttpGet("searchMerchandise/{dataSearch}")]
        public JsonResult SearchUser(string dataSearch)

        {
            string query = @"
                            select * from
                            dbo.Merchandise 
                            where 1=1 
                            " + "and Name LIKE '%" + dataSearch + "%'";

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

        [HttpPost]

        public JsonResult Post(Merchandise emp)
        {
            string query = @"insert into dbo.Merchandise (Name)
                    values (@Name)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    Guid idMerchandise = Guid.NewGuid();
                    myCommand.Parameters.AddWithValue("@Id", idMerchandise.ToString());
                    myCommand.Parameters.AddWithValue("@Name", emp.Name);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Merchandise emp)
        {
            string query = @"
                           update dbo.Merchandise
                           set Name=@Name
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
                    myCommand.Parameters.AddWithValue("@Name", emp.Name);
                    myCommand.Parameters.AddWithValue("@Id", new Guid(emp.Id));
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            string query = @"
                            delete from dbo.StoreMerchandise
                            where MerchandiseId=@Id
                            delete from dbo.Merchandise
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
                    myCommand.Parameters.AddWithValue("@Id", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}