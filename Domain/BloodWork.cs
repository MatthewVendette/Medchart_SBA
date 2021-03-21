using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class BloodWork
    {
        public Guid Id { get; set; }
        [ForeignKey("AspNetUsers")]
        public Guid userId { get; set; }

        public string Title { get; set; } //TODO: Replace this with Username, FK with Users DB
        public DateTime ExamDate { get; set; }
        public DateTime ResultsDate { get; set; }
        public string Description { get; set; }
        public int Hemoglobin { get; set; }
        public int Hematocrit { get; set; }
        public int WhiteBloodCellCount { get; set; }
        public int RedBloodCellCount { get; set; }
    }
}