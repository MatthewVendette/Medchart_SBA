using Domain;
using FluentValidation;

namespace Application.BloodWorks
{
    public class BloodWorkValidator : AbstractValidator<BloodWork>
    {
        public BloodWorkValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.ExamDate).NotEmpty();
            RuleFor(x => x.ResultsDate).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Hemoglobin).NotEmpty();
            RuleFor(x => x.Hematocrit).NotEmpty();
            RuleFor(x => x.WhiteBloodCellCount).NotEmpty();
            RuleFor(x => x.RedBloodCellCount).NotEmpty();
        }
    }
}