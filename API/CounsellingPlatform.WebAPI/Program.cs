using CounsellingPlatform.Application;
using CounsellingPlatform.Infrastructure;
using CounsellingPlatform.Infrastructure.Persistence;
using CounsellingPlatform.WebAPI.Extensions;
using CounsellingPlatform.WebAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

// ── Controllers ──────────────────────────────────────────────────────────────
builder.Services.AddControllers(options =>
    options.Filters.Add<GlobalExceptionFilter>());
builder.Services.AddEndpointsApiExplorer();

// ── Clean Architecture layers ────────────────────────────────────────────────
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

// ── Cross-cutting concerns ───────────────────────────────────────────────────
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddSwaggerDocumentation();
builder.Services.AddCorsPolicy(builder.Configuration);
builder.Services.AddSignalR();

// ── Build ────────────────────────────────────────────────────────────────────
var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.UseSwaggerDocumentation();

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// ── Seed ─────────────────────────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DbSeeder.SeedAsync(db);
}

app.Run();
