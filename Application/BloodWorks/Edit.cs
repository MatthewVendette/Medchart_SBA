using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.BloodWorks
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public BloodWork BloodWork { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BloodWork).SetValidator(new BloodWorkValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var bloodWork = await _context.BloodWorks.FindAsync(request.BloodWork.Id);

                if (bloodWork == null) return null;

                _mapper.Map(request.BloodWork, bloodWork);

                var result = await _context.SaveChangesAsync() > 0; //result is true if succesfully written in to the database, false if no changes were made.

                if (!result) return Result<Unit>.Failure("Failed to update blood work entry.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}