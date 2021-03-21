using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistance;

namespace Application.BloodWorks
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var bloodWork = await _context.BloodWorks.FindAsync(request.Id);

                if (bloodWork == null) return null;

                _context.Remove(bloodWork);

                var result = await _context.SaveChangesAsync() > 0; //result is true if succesfully written in to the database, false if no changes were made.

                if (!result) return Result<Unit>.Failure("Failed to remove blood work entry.");

                return Result<Unit>.Success(Unit.Value);;
            }
        }
    }


}