using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistance;

namespace Persistance
{
    //Seeds the database with some initial data for testing
    public class Seed
    {
        public static async Task SeedData (DataContext ctx) 
        {
            if (ctx.BloodWorks.Any()) return; //only seed if empty
            
            var bloodWorks = new List<BloodWork>
            {
                new BloodWork
                {
                    Title = "Bob's bloodwork",
                    ExamDate = DateTime.Now.AddMonths(-3),
                    ResultsDate = DateTime.Now.AddMonths(-1),
                    Description = "Bloodwork results from test done 3 months ago",
                    Hemoglobin = 13,
                    Hematocrit = 45,
                    WhiteBloodCellCount = 7200,
                    RedBloodCellCount = 4819200,
                },
                new BloodWork
                {
                    Title = "Jane's bloodwork",
                    ExamDate = DateTime.Now.AddMonths(-7),
                    ResultsDate = DateTime.Now.AddMonths(-6),
                    Description = "Bloodwork results from test done 7 months ago",
                    Hemoglobin = 15,
                    Hematocrit = 39,
                    WhiteBloodCellCount = 4300,
                    RedBloodCellCount = 3980100,
                },
                new BloodWork
                {
                    Title = "Kim's bloodwork",
                    ExamDate = DateTime.Now.AddMonths(-2),
                    ResultsDate = DateTime.Now.AddMonths(-1),
                    Description = "Bloodwork results from test done 2 months ago",
                    Hemoglobin = 16,
                    Hematocrit = 42,
                    WhiteBloodCellCount = 5100,
                    RedBloodCellCount = 4101700,
                }
                
            };
            
            await ctx.BloodWorks.AddRangeAsync(bloodWorks);
            await ctx.SaveChangesAsync();
        }
    }
}