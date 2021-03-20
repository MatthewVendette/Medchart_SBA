using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.BloodWorks
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var bloodWork = await _context.BloodWorks.FindAsync(request.Id); //TODO: Add 404 handling

                _context.Remove(bloodWork);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }


}