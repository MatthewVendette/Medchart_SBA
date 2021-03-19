using System;

namespace Domain
{
    public class BloodWork
    {
        public Guid Id { get; set; }
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